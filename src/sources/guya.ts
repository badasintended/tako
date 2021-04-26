import {
  Chapter,
  Manga,
  MangaDetail,
  MangaPagination,
  Page,
  ReadingMode,
  make
} from "api/model";

import { getJson } from "api/fetcher";

export namespace guya {
  export const name = "Guya.moe";
  export const baseUrl = "https://guya.moe";
  export const lang = "en";

  export function getDetail(mangaId: string): Promise<MangaDetail> {
    return getJson(`${baseUrl}/api/series/${mangaId}`).then((manga) =>
      make<MangaDetail>({
        id: manga["slug"],
        source: "guya",
        title: manga["title"],
        cover: `${baseUrl}${manga["cover"]}`,
        authors: [manga["author"]],
        artists: [manga["artist"]],
        description: manga["description"]
      })
    );
  }

  export function getChapters(mangaId: string, page: number): Promise<Chapter[]> {
    return getJson(`${baseUrl}/api/series/${mangaId}`).then((manga) => {
      const groups: string[] = [
        ...manga["preferred_sort"],
        ...Object.keys(manga["groups"])
      ];
      return Object.entries(manga["chapters"]).map(([num, ch]) => {
        const prevered = Object.keys(ch["groups"]).filter((k) => groups.includes(k))[0];
        return make<Chapter>({
          id: `${num}-${prevered}`,
          source: "guya",
          manga: mangaId,
          readingMode: ReadingMode.RIGHT_LEFT,
          number: +num,
          volume: +ch["volume"],
          name: ch["title"],
          uploadDate: ch["release_date"][prevered],
          scanlators: manga["groups"][prevered].split(" | ")
        });
      });
    });
  }

  export function getPages(mangaId: string, chapterId: string): Promise<Page[]> {
    return getJson(`${baseUrl}/api/series/${mangaId}`).then((manga) => {
      const [number, group] = chapterId.split("-");
      const chapter = manga["chapters"][number];
      return chapter["groups"][group].map((page, i) =>
        make<Page>({
          index: i,
          url: `${baseUrl}/media/manga/${manga["slug"]}/chapters/${chapter["folder"]}/${group}/${page}`
        })
      );
    });
  }

  export namespace indexes {
    export function all(page: number): Promise<MangaPagination> {
      return getJson(`${baseUrl}/api/get_all_series`).then((json) =>
        make<MangaPagination>({
          totalPages: 1,
          page: 1,
          mangas: Object.entries(json).map(([title, manga]) =>
            make<Manga>({
              id: manga["slug"],
              source: "guya",
              title: title,
              cover: `${baseUrl}${manga["cover"]}`
            })
          )
        })
      );
    }
  }
}
