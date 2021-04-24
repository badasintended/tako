import type {
  MangaPagination,
  MangaDetail,
  ChapterPagination,
  Page
} from "tako/api/model";

export namespace test {
  export const name = "test";
  export const baseUrl = "test";
  export const lang = "all";

  export function getDetail(mangaId: string): Promise<MangaDetail> {
    const detail: MangaDetail = {
      id: mangaId,
      title: "Test manga",
      altTitles: ["bruh moment"],
      cover: "https://picsum.photos/200/300",
      authors: ["deirn", "also deirn"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    };
    return Promise.resolve(detail);
  }

  export function getChapters(
    mangaId: string,
    page: number
  ): Promise<ChapterPagination> {
    const chapters: ChapterPagination = {
      page: 1,
      totalPages: 1,
      chapters: [
        {
          id: "0",
          number: 0,
          volume: 1,
          name: "Test",
          scanlators: ["deirn"]
        },
        {
          id: "1",
          number: 1,
          volume: 1,
          name: "Test 1",
          scanlators: ["deirn"]
        }
      ]
    };

    return Promise.resolve(chapters);
  }

  export function getPages(
    mangaId: string,
    chapterId: string
  ): Promise<Page[]> {
    const pages: Page[] = [
      {
        url: "https://picsum.photos/200/300",
        index: 1
      },
      {
        url: "https://picsum.photos/200/300",
        index: 2
      }
    ];
    return Promise.resolve(pages);
  }

  export namespace indexes {
    export function latest(page: number): Promise<MangaPagination> {
      const pagination: MangaPagination = {
        totalPages: 2,
        page: 1,
        mangas: [
          {
            id: "0",
            title: "Test manga 0",
            cover: "https://picsum.photos/200/300"
          },
          {
            id: "1",
            title: "Test manga 1",
            cover: "https://picsum.photos/200/300"
          }
        ]
      };

      return Promise.resolve(pagination);
    }
  }
}
