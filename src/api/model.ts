export enum PublicationStatus {
  ON_GOING,
  FINISHED,
  HIATUS,
  CANCELLED
}

export enum ReadingMode {
  RIGHT_LEFT,
  LEFT_RIGHT,
  LONG_STRIP
}

export function make<T>(t: T): T {
  return t;
}

export type MangaPagination = {
  totalPages: number;
  page: number;
  mangas: Manga[];
};

export type Manga = {
  id: string;
  source: string;
  title: string;
  cover: string;
};

export type MangaDetail = Manga & {
  altTitles?: string[];
  authors?: string[];
  artists?: string[];
  status?: PublicationStatus;
  genres?: string[];
  description?: string;
};

export type Chapter = {
  id: string;
  source: string;
  manga: string;
  number: number;
  readingMode: ReadingMode;
  volume?: number;
  name?: string;
  uploadDate?: number;
  scanlators?: string[];
};

export type Page = {
  url: string;
  index: number;
};

export type Source = {
  name: string;
  baseurl: string;
  lang: string;
  indexes: Record<string, (page: number) => Promise<MangaPagination>>;
  getDetail(mangaId: string): Promise<MangaDetail>;
  getChapters(mangaId: string): Promise<Chapter[]>;
  getPages(mangaId: string, chapterId: string): Promise<Page[]>;
};
