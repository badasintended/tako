import type {
  MangaPagination,
  MangaDetail,
  ChapterPagination,
  Page
} from "tako/api/model";

export abstract class Source {
  abstract name: string;

  abstract baseUrl: string;

  abstract lang: string;

  indexes: Record<string, (page: number) => Promise<MangaPagination>>;

  abstract getDetail(mangaId: string): Promise<MangaDetail>;

  abstract getChapters(
    mangaId: string,
    page: number
  ): Promise<ChapterPagination>;

  abstract getPages(mangaId: string, chapterId: string): Promise<Page[]>;
}

export abstract class NsfwSource extends Source {
  readonly nsfw = true;
}
