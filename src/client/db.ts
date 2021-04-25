import Dexie from "dexie";

export type Library = {
  source: string;
  manga: string;
};

export type ReadChapter = {
  source: string;
  manga: string;
  chapter: string;
};

export class TakoDatabase extends Dexie {
  public libraries: Dexie.Table<Library, number>;
  public readChapters: Dexie.Table<ReadChapter, number>;
  public fakeUploadTime: Dexie.Table<number, string>;

  public constructor() {
    super("TakoDatabase");
    this.version(1).stores({
      libraries: "source,manga",
      readChapters: "source,manga,chapter",
      fakeUploadTime: "time"
    });
  }
}

const db = new TakoDatabase();
export default db;
