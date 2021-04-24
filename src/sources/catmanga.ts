import {
  MangaPagination,
  Manga,
  MangaDetail,
  ChapterPagination,
  Chapter,
  Page,
  make
} from "tako/api/model";
import { getNextData } from "tako/api/fetcher";

export namespace catmanga {
  export const name = "CatManga";
  export const baseUrl = "https://catmanga.org";
  export const lang = "en";

  export function getDetail(mangaId: string): Promise<MangaDetail> {
    return getNextData(`${baseUrl}/series/${mangaId}`).then((it) => {
      const series = it.props.pageProps.series;
      return make<MangaDetail>({
        id: series["series_id"],
        title: series["title"],
        cover: series["cover_art"]["source"],
        altTitles: series["alt_titles"],
        authors: series["authors"],
        description: series["description"],
        genres: series["genres"]
      });
    });
  }

  export function getChapters(
    mangaId: string,
    page: number
  ): Promise<ChapterPagination> {
    return getNextData(`${baseUrl}/series/${mangaId}`).then((it) => {
      return make<ChapterPagination>({
        totalPages: 1,
        page: 1,
        chapters: it.props.pageProps.series.chapters
          .map((it) => {
            return make<Chapter>({
              id: it["number"].toString(),
              volume: it["volume"],
              number: it["number"],
              name: it["title"],
              scanlators: it["groups"]
            });
          })
          .sort((a, b) => b.number - a.number)
      });
    });
  }

  export function getPages(
    mangaId: string,
    chapterId: string
  ): Promise<Page[]> {
    return getNextData(`${baseUrl}/series/${mangaId}/${chapterId}`).then((it) =>
      it.props.pageProps.pages.map((url, i) => {
        return make<Page>({
          url: url,
          index: i
        });
      })
    );
  }

  export namespace indexes {
    export function latest(page: number): Promise<MangaPagination> {
      return getNextData(baseUrl).then((it) => {
        return make<MangaPagination>({
          totalPages: 1,
          page: 1,
          mangas: it.props.pageProps.latests.map((arr: any[]) => {
            const series = arr[0];
            return make<Manga>({
              id: series["series_id"],
              title: series["title"],
              cover: series["cover_art"]["source"]
            });
          })
        });
      });
    }

    export function all(page: number): Promise<MangaPagination> {
      return getNextData(baseUrl).then((it) => {
        return make<MangaPagination>({
          totalPages: 1,
          page: 1,
          mangas: it.props.pageProps.series.map((series) => {
            return make<Manga>({
              id: series["series_id"],
              title: series["title"],
              cover: series["cover_art"]["source"]
            });
          })
        });
      });
    }
  }
}
