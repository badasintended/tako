import type { Chapter, Manga, Page } from "tako/api/model";

export type ParseResult = {
  sourceId: string,
  mangaId: string,
  chapterId?: string
}

export interface Source {
  id: string;
  baseUrl: string;

  parseUrl(url: URL): Promise<ParseResult>

  getDetails(mangaId: string): Promise<Manga>

  getChapters(mangaId: string): Promise<Chapter[]>

  getPages(mangaId: string, chapterId: string): Promise<Page[]>
}