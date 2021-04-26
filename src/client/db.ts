import Dexie from "dexie";

export type Bookmark = {
  id?: number;
  source: string;
  mangaId: string;
  title: string;
  cover: string;
};

export type ReadChapter = {
  id?: number;
  source: string;
  manga: string;
  chapter: string;
};

export type FakeUploadTime = {
  id: string;
  date: number;
};

export class TakoDatabase extends Dexie {
  public libraries: Dexie.Table<Bookmark, number>;
  public readChapters: Dexie.Table<ReadChapter, number>;
  public fakeUploadTimes: Dexie.Table<FakeUploadTime, number>;

  public constructor() {
    super("TakoDatabase");
    this.version(1).stores({
      libraries: "id++,source,manga",
      readChapters: "id++,source,manga,chapter",
      fakeUploadTimes: "id,date"
    });
  }
}

export const db = new TakoDatabase();
