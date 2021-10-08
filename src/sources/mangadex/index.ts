import type { ParseResult, Source } from "tako/api/source";
import type { Chapter, Manga, Page } from "tako/api/model";
import { MangaStatus } from "tako/api/model";
import { fetcher } from "tako/api/fetcher";
import { make } from "tako/api/util";
import type { AuthorSpec, ChapterListSpec, ChapterSpec, CoverSpec, MangaSpec, MdAtHomeServerSpec } from "tako/sources/mangadex/spec";
import { DAY } from "tako/api/time-constants";

const regex = /\/title\/(?<manga>.*?)(\/.*)?$/i;

export class MangaDex implements Source {
  id: string;
  baseUrl = "https://mangadex.org";
  apiBaseUrl = "https://api.mangadex.org";
  uploadsBaseUrl = "https://uploads.mangadex.org";

  parseUrl(url: URL): Promise<ParseResult> {
    const path = url.pathname;
    const match = path.match(regex);
    if (match) {
      return Promise.resolve({
        sourceId: this.id,
        mangaId: match.groups["manga"]
      });
    }
  }

  getManga(mangaId: string): Promise<Manga> {
    return fetcher.json<MangaSpec>(`${this.apiBaseUrl}/manga/${mangaId}`)
      .then(mangaSpec => fetcher.json<ChapterListSpec>(`${this.apiBaseUrl}/manga/${mangaId}/aggregate?translatedLanguage[]=en`)
        .then(async chaptersSpec => {
          const coverArt = mangaSpec.data.relationships.find(it => it.type === "cover_art");
          const coverSpec = coverArt ? await fetcher.json<CoverSpec>(`${this.apiBaseUrl}/cover/${coverArt.id}`, DAY) : undefined;

          const authors = await Promise.all(mangaSpec.data.relationships
            .filter(it => it.type === "author")
            .map(it => fetcher.json<AuthorSpec>(`${this.apiBaseUrl}/author/${it.id}`, DAY)));

          const artists = await Promise.all(mangaSpec.data.relationships
            .filter(it => it.type === "artist")
            .map(it => fetcher.json<AuthorSpec>(`${this.apiBaseUrl}/author/${it.id}`, DAY)));

          const chapters: Chapter[] = [];
          const promises: Promise<unknown>[] = [];
          for (const volumeNumber in chaptersSpec.volumes) {
            const volumeChapters = chaptersSpec.volumes[volumeNumber].chapters;
            const volumeIndex = +volumeNumber;
            for (const chapterNumber in volumeChapters) {
              const volumeChapter = volumeChapters[chapterNumber];
              promises.push(fetcher.json<ChapterSpec>(`${this.apiBaseUrl}/chapter/${volumeChapter.id}`)
                .then(chapter => Promise.all(chapter.data.relationships
                  .filter(it => it.type === "scanlation_group")
                  .map(it => fetcher.json<AuthorSpec>(`${this.apiBaseUrl}/group/${it.id}`, DAY)))
                  .then(groups => chapters.push({
                    id: volumeChapter.id,
                    volume: !Number.isNaN(volumeIndex) ? volumeIndex : undefined,
                    number: chapter.data.attributes.chapter ?? 0,
                    title: chapter.data.attributes.title,
                    scanlators: groups.map(it => it.data.attributes.name),
                    uploadDate: new Date(chapter.data.attributes.publishAt).getTime() / 1000
                  }))
                ));
            }
          }
          await Promise.all(promises);

          return make<Manga>({
            id: mangaId,
            source: this.id,
            url: `${this.baseUrl}/title/${mangaId}`,
            title: mangaSpec.data.attributes.title["en"],
            cover: coverSpec ? `${this.uploadsBaseUrl}/covers/${mangaId}/${coverSpec.data.attributes.fileName}` : "",
            altTitles: mangaSpec.data.attributes.altTitles.map(it => Object.values(it)).flat(),
            authors: authors.map(it => it.data.attributes.name),
            artists: artists.map(it => it.data.attributes.name),
            status: MangaStatus.ONGOING,
            description: mangaSpec.data.attributes.description["en"],
            chapters: chapters
          });
        }));
  }

  getPages(mangaId: string, chapterId: string): Promise<Page[]> {
    return fetcher.json<MdAtHomeServerSpec>(`${this.apiBaseUrl}/at-home/server/${chapterId}`)
      .then(server => fetcher.json<ChapterSpec>(`${this.apiBaseUrl}/chapter/${chapterId}`)
        .then(chapter => chapter.data.attributes.data.map((page, i) => make<Page>({
          index: i,
          url: `${server.baseUrl}/data/${chapter.data.attributes.hash}/${page}`
        }))));
  }
}

