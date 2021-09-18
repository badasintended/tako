import { fetcher } from "tako/api/fetcher";
import type { Chapter, Manga, Page } from "tako/api/model";
import { MangaStatus } from "tako/api/model";
import type { ParseResult, Source } from "tako/api/source";
import { make } from "tako/api/util";

const regex = {
  mcg: /\/read\/manga(?<manga>\/.*?)(?<chapter>\/.*?)(?<group>\/.*?)(\/)?$/i,
  m: /\/read\/manga(?<manga>\/.*?)(\/)?$/i
};

export class Guya implements Source {
  id: string;
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  parseUrl(url: URL): Promise<ParseResult> {
    const path = url.pathname;
    console.log(path);
    const mcg = path.match(regex.mcg);
    console.log(mcg);
    if (mcg) {
      return Promise.resolve({
        sourceId: this.id,
        mangaId: mcg.groups["manga"].substr(1),
        chapterId: `${mcg.groups["chapter"].substr(1)}-${mcg.groups["group"].substr(1)}`
      });
    }

    const m = path.match(regex.m);
    if (m) {
      return Promise.resolve({
        sourceId: this.id,
        mangaId: m.groups["manga"].substr(1)
      });
    }

    return Promise.reject();
  }

  getManga(mangaId: string): Promise<Manga> {
    return fetcher.json<MangaSpec>(`${(this.baseUrl)}/api/series/${mangaId}`).then(manga => {
      const groups: string[] = [
        ...manga.preferred_sort,
        ...Object.keys(manga.groups)
      ];
      return make<Manga>({
        id: manga.slug,
        source: this.id,
        title: manga.title,
        cover: `${this.baseUrl}${manga.cover}`,
        authors: [manga.author],
        artists: [manga.artist],
        description: manga.description,
        status: MangaStatus.UNKNOWN,
        chapters: Object.entries(manga.chapters).map(([num, ch]) => {
          const preferred = Object.keys(ch.groups).filter((k) => groups.includes(k))[0];
          return make<Chapter>({
            id: `${num}-${preferred}`,
            number: +num,
            volume: +ch.volume,
            title: ch.title,
            uploadDate: ch.release_date[preferred],
            scanlators: manga.groups[preferred].split(" | ")
          });
        })
      });
    });
  }

  getPages(mangaId: string, chapterId: string): Promise<Page[]> {
    return fetcher.json<MangaSpec>(`${(this.baseUrl)}/api/series/${mangaId}`).then(manga => {
      const [number, group] = chapterId.split("-");
      const chapter = manga.chapters[number];
      return chapter.groups[group].map((page, i) => make<Page>({
        index: i,
        url: `${this.baseUrl}/media/manga/${manga.slug}/chapters/${chapter.folder}/${group}/${page}`
      }));
    });
  }
}

type MangaSpec = {
  slug: string
  title: string
  description: string
  author: string
  artist: string
  groups: Record<string, string>
  cover: string
  preferred_sort: string[]
  chapters: Record<string, ChapterSpec>
}

type ChapterSpec = {
  volume: string
  title: string
  folder: string
  groups: Record<string, string[]>
  release_date: Record<string, number>
}
