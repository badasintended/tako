import type { Manga, Page } from "tako/api/model";

export type ParseResult = {
  sourceId: string,
  mangaId: string,
  chapterId?: string
}

export interface Source {
  id: string;
  baseUrl: string;

  parseUrl(url: URL): Promise<ParseResult>

  getManga(mangaId: string): Promise<Manga>

  getPages(mangaId: string, chapterId: string): Promise<Page[]>
}