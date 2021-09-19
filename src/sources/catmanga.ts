import type { ParseResult, Source } from "tako/api/source";
import type { Chapter, Manga, Page } from "tako/api/model";
import { MangaStatus } from "tako/api/model";
import { fetcher } from "tako/api/fetcher";
import { make } from "tako/api/util";

const regex = /\/series\/(?<manga>.*?)(\/(?<chapter>.*?))\/?$/i;

export class CatManga implements Source {
  id: string;
  baseUrl = "https://catmanga.org";

  parseUrl(url: URL): Promise<ParseResult> {
    const path = url.pathname;
    const match = path.match(regex);
    if (match) {
      return Promise.resolve({
        sourceId: this.id,
        mangaId: match.groups["manga"],
        chapterId: match.groups["chapter"]
      });
    }
    return Promise.reject();
  }

  getManga(mangaId: string): Promise<Manga> {
    return fetcher.next<MangaSpec>(`${(this.baseUrl)}/series/${mangaId}`).then(it => {
      const series = it.props.pageProps.series;
      const status = series.status;
      return make<Manga>({
        id: series.series_id,
        source: this.id,
        title: series.title,
        cover: series.cover_art.source,
        altTitles: series.alt_titles,
        authors: series.authors,
        description: series.description,
        tags: series.genres,
        status: status == "ongoing" ? MangaStatus.ONGOING : status == "completed" ? MangaStatus.COMPLETED : MangaStatus.UNKNOWN,
        chapters: series.chapters.map((it) => {
          return make<Chapter>({
            id: it.number.toString(),
            volume: it.volume,
            number: it.number,
            title: it.title,
            scanlators: it.groups
          });
        })
      });
    });
  }

  getPages(mangaId: string, chapterId: string): Promise<Page[]> {
    return fetcher.next<ChapterSpec>(`${(this.baseUrl)}/series/${mangaId}/${chapterId}`).then((it) =>
      it.props.pageProps.pages.map((url, i) => {
        return make<Page>({
          url: url,
          index: i
        });
      })
    );
  }
}

type MangaSpec = {
  props: {
    pageProps: {
      series: {
        series_id: string
        title: string
        alt_titles: string[]
        status: string
        authors: string[]
        genres: string[]
        description: string
        cover_art: {
          source: string
        }
        chapters: [{
          title: string
          groups: string[]
          number: number
          volume: number
        }]
      }
    }
  }
}

type ChapterSpec = {
  props: {
    pageProps: {
      pages: string[]
    }
  }
}