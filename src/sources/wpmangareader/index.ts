import type { ParseResult, Source } from "tako/api/source";
import type { Chapter, Manga, Page } from "tako/api/model";
import { MangaStatus } from "tako/api/model";
import { fetcher } from "tako/api/fetcher";
import { make } from "tako/api/util";

export type WpMangaReaderConfig = {
  mangaDir?: string
}

export class WpMangaReader implements Source {
  baseUrl: string;
  id: string;
  mangaDir: string;
  mangaRegex: RegExp;
  chapterRegex: RegExp;

  constructor(baseUrl: string, conf: WpMangaReaderConfig = {}) {
    this.baseUrl = baseUrl;
    this.mangaDir = conf.mangaDir ?? "manga";
    this.mangaRegex = new RegExp(`${this.mangaDir}/(?<manga>.*?)(/)?$`, "i");
    this.chapterRegex = new RegExp(`${baseUrl}/(?<chapter>.*?)(/)?$`, "i");
  }

  // parsing chapter url is not supported
  parseUrl(url: URL): Promise<ParseResult> {
    const match = url.pathname.match(this.mangaRegex);
    if (match) {
      return Promise.resolve({
        sourceId: this.id,
        mangaId: match.groups["manga"]
      });
    }
  }

  getManga(mangaId: string): Promise<Manga> {
    return fetcher.cheerio(`${this.baseUrl}/${this.mangaDir}/${mangaId}`).then($ => {
      const chapters = $("#chapterlist li .eph-num a");
      let chapterNumber = chapters.length;
      return make<Manga>({
        id: mangaId,
        source: this.id,
        url: `${this.baseUrl}/${this.mangaDir}/${mangaId}`,
        title: $("h1.entry-title").first().text(),
        cover: $(".thumb img").first().attr("src"),
        authors: [$(".tsinfo .imptdt:contains(Author) i").first().text()],
        artists: [$(".tsinfo .imptdt:contains(Artist) i").first().text()],
        status: MangaStatus.UNKNOWN,
        description: $(".desc, .entry-content[itemprop=description]").map((i, e) => $(e).text().trim()).get().join("\n"),
        chapters: chapters.map((i, e) => {
          const element = $(e);
          return make<Chapter>({
            id: element.attr("href").match(this.chapterRegex).groups["chapter"],
            number: chapterNumber--,
            title: element.children(".chapternum").text()
          });
        }).get()
      });
    });
  }

  getPages(mangaId: string, chapterId: string): Promise<Page[]> {
    return fetcher.cheerio(`${this.baseUrl}/${chapterId}`).then($ => $("div#readerarea img[loading=lazy]")
      .map((i, e) => make<Page>({
        index: i,
        url: $(e).attr("src")
      })).get());
  }
}