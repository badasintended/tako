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

export class MangaPagination {
  totalPages: number;
  page: number;
  mangas: Manga[];
}

export class Manga {
  id: string;
  title: string;
  cover: string;
}

export class MangaDetail extends Manga {
  altTitles?: string[];
  authors?: string[];
  artists?: string[];
  status?: PublicationStatus;
  genres?: string[];
  description?: string;
}

export class ChapterPagination {
  totalPages: number;
  page: number;
  chapters: Chapter[];
}

export class Chapter {
  id: string;
  number: number;

  readingMode?: ReadingMode;

  volume?: number;
  name?: string;
  uploadDate?: number;
  scanlators?: string[];
}

export class Page {
  url: string;
  index: number;
}
