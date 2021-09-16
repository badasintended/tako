import type { ParseResult, Source } from "tako/api/source";
import type { Chapter, Manga, Page } from "tako/api/model";
import { make } from "tako/api/model";
import { fetcher } from "tako/api/fetcher";

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

  getDetails(mangaId: string): Promise<Manga> {
    return fetcher.next<MangaSpec>(`${(this.baseUrl)}/series/${mangaId}`).then(it => {
      console.log(it);
      const series = it.props.pageProps.series;
      return make<Manga>({
        id: series.series_id,
        source: this.id,
        title: series.title,
        cover: series.cover_art.source,
        altTitles: series.alt_titles,
        authors: series.authors,
        description: series.description,
        tags: series.genres
      });
    });
  }

  getChapters(mangaId: string): Promise<Chapter[]> {
    return fetcher.next<MangaSpec>(`${(this.baseUrl)}/series/${mangaId}`).then((it) =>
      it.props.pageProps.series.chapters.map((it) => {
        return make<Chapter>({
          id: it.number.toString(),
          source: this.id,
          manga: mangaId,
          volume: it.volume,
          number: it.number,
          title: it.title,
          scanlators: it.groups
        });
      })
    );
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