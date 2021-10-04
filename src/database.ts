import Dexie from "dexie";

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
      readChapters: "id++,sourceId,mangaId,chapterId,lastPage,totalPage",
      fakeUploadTimes: "id,date"
    });
  }
}

export const database = new TakoDatabase();
