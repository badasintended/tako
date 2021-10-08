import Dexie from "dexie";
import type { Manga } from "tako/api/model";

export type Bookmark = {
  id?: number
  sourceId: string
  mangaId: string
  title: string
  cover: string
}

export type ReadChapter = {
  id?: number
  sourceId: string
  mangaId: string
  chapterId: string
  lastPage: number
  totalPage: number
}

export type FakeUploadTime = {
  id: string
  date: number
}

export class TakoDatabase extends Dexie {
  public libraries: Dexie.Table<Bookmark, number>;
  public readChapters: Dexie.Table<ReadChapter, number>;
  public fakeUploadTimes: Dexie.Table<FakeUploadTime, number>;

  public constructor() {
    super("TakoDatabase");
    this.version(1).stores({
      libraries: "id++,sourceId,mangaId",
      readChapters: "id++,sourceId,mangaId,chapterId",
      fakeUploadTimes: "id"
    });
  }
}

export const database = new TakoDatabase();

type FetcherCache = {
  url: string
  time: number
  body: string
}

class CacheDatabase extends Dexie {
  fetcher: Dexie.Table<FetcherCache, string>;
  manga: Dexie.Table<Manga>;

  constructor() {
    super("CacheDatabase");
    this.version(2).stores({
      fetcher: "url",
      manga: "[source+id]"
    });
  }
}

export const cacheDb = new CacheDatabase();