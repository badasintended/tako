import type { Manga, Page } from "tako/api/model";
import { sources, url2source } from "tako/sources";

export type ParseResult = {
  sourceId: string,
  mangaId: string,
  chapterId?: string
}

export interface Source {
  id: string;
  baseUrl: string;

  parseUrl(url: URL): Promise<ParseResult>;

  getManga(mangaId: string): Promise<Manga>;

  getPages(mangaId: string, chapterId: string): Promise<Page[]>;
}

export const Error = {
  unknownSource(sourceId: string): string {
    return `Unknown source: ${sourceId}`;
  }
};

export async function parseUrl(val: string): Promise<ParseResult> {
  const url = new URL(val);
  const source = url2source[url.host];
  return source ? source.parseUrl(url) : Promise.reject(Error.unknownSource(url.host));
}

export async function getManga(sourceId: string, mangaId: string): Promise<Manga> {
  const source = sources[sourceId];
  return source ? source.getManga(mangaId) : Promise.reject(Error.unknownSource(sourceId));
}

export async function getPages(sourceId: string, mangaId: string, chapterId: string): Promise<Page[]> {
  const source = sources[sourceId];
  return source ? source.getPages(mangaId, chapterId) : Promise.reject(Error.unknownSource(sourceId));
}
