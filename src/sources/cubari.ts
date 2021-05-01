import {
  Chapter,
  MangaDetail,
  MangaPagination,
  Page,
  ReadingMode,
  make
} from "api/model";

import { getJson } from "api/fetcher";

export namespace cubari {
  export const name = "Cubari";
  export const baseUrl = "https://cubari.moe";
  export const lang = "all";

  function split(id: string): string[] {
    return id.split(/-(.+)/);
  }

  export function getDetail(mangaId: string): Promise<MangaDetail> {
    const [type, slug] = split(mangaId);
    return getJson(`${baseUrl}/read/api/${type}/series/${slug}`).then((manga) =>
      make<MangaDetail>({
        id: mangaId,
        source: "cubari",
        title: manga["title"],
        cover: manga["cover"],
        description: manga["description"],
        authors: [manga["author"]],
        artists: [manga["artist"]]
      })
    );
  }

  export function getChapters(mangaId: string): Promise<Chapter[]> {
    const [type, slug] = split(mangaId);
    return getJson(`${baseUrl}/read/api/${type}/series/${slug}`).then((manga) => {
      const groups: string[] = Object.keys(manga["groups"]);
      return Object.entries(manga["chapters"]).map(([num, ch]) => {
        const prevered = Object.keys(ch["groups"]).filter((k) => groups.includes(k))[0];
        return make<Chapter>({
          id: `${num}-${prevered}`,
          source: "cubari",
          manga: mangaId,
          readingMode: ReadingMode.RIGHT_LEFT,
          number: +num,
          volume: +ch["volume"],
          name: ch["title"],
          scanlators: manga["groups"][prevered].split(" | ")
        });
      });
    });
  }

  export function getPages(mangaId: string, chapterId: string): Promise<Page[]> {
    const [type, slug] = split(mangaId);
    return getJson(`${baseUrl}/read/api/${type}/series/${slug}`).then((manga) => {
      const [number, group] = chapterId.split("-");
      const chapter = manga["chapters"][number];
      const pages = chapter["groups"][group];
      if (Array.isArray(pages)) {
        return pages.map((page, i) =>
          make<Page>({
            url: page["src"],
            index: i
          })
        );
      } else {
        return getJson(`${baseUrl}${pages}`).then((arr) =>
          arr.map((page, i) =>
            make<Page>({
              url: page["src"],
              index: i
            })
          )
        );
      }
    });
  }

  export namespace indexes {
    export function nothing(page: number): Promise<MangaPagination> {
      return Promise.resolve(
        make<MangaPagination>({
          page: 1,
          totalPages: 1,
          mangas: []
        })
      );
    }
  }
}
