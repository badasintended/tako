import type { ParseResult, Source } from "tako/api/source";
import type { Chapter, Manga, Page } from "tako/api/model";
import { MangaStatus } from "tako/api/model";
import { fetcher } from "tako/api/fetcher";
import FormData from "form-data";
import fetch from "node-fetch";
import cheerio from "cheerio";
import Cheerio = cheerio.Cheerio;
import { make } from "tako/api/util";

const regex = {
  mangaChapter: /manga\/(?<manga>.*?)(\/chapter-(?<chapter>.*?))?(\?.*)?\/?$/i
};

export type MadaraConfig = {
  newAjax?: boolean
}

export class Madara implements Source {
  id: string;
  baseUrl: string;
  config: MadaraConfig;

  constructor(baseUrl: string, conf: MadaraConfig = {}) {
    this.baseUrl = baseUrl;
    this.config = conf;
  }

  parseChapter(mangaId: string, element: Cheerio): Chapter {
    const a = element.children("a");
    const href = a.attr("href");
    const chapterId = href.match(regex.mangaChapter).groups["chapter"];
    return {
      id: chapterId,
      number: +chapterId.replace("-", "."),
      title: a.text().trim()
    };
  }

  getChaptersAjax(mangaId: string, url: string, data?: FormData): Promise<Chapter[]> {
    return fetch(url, {
      method: "post",
      body: data
    }).then(res => res.text())
      .then(text => {
        const $ = cheerio.load(text);
        return $("li.wp-manga-chapter")
          .map((i, e) => this.parseChapter(mangaId, $(e)))
          .get();
      });
  }

  getImage(element: Cheerio): string {
    return (element.attr("data-src")
      ?? element.attr("data-lazy-src")
      ?? element.attr("srcset")?.split(" ")[0]
      ?? element.attr("src")).trim();
  }

  parseUrl(url: URL): Promise<ParseResult> {
    const match = url.pathname.match(regex.mangaChapter);
    if (match) {
      return Promise.resolve({
        sourceId: this.id,
        mangaId: match.groups["manga"],
        chapterId: match.groups["chapter"]
      });
    }
    return;
  }

  getManga(mangaId: string): Promise<Manga> {
    return fetcher.cheerio(`${this.baseUrl}/manga/${mangaId}`).then($ => {
      const chapterHolder = $("div[id^=manga-chapters-holder]");
      const chapterElements = $("li.wp-manga-chapter");

      let chapters: Promise<Chapter[]>;
      if (chapterElements.length > 0) {
        chapters = Promise.resolve(chapterElements.map((i, e) => this.parseChapter(mangaId, $(e))).get());
      } else if (this.config.newAjax) {
        chapters = this.getChaptersAjax(mangaId, `${this.baseUrl}/manga/${mangaId}/ajax/chapters`);
      } else {
        const data = new FormData();
        data.append("action", "manga_get_chapters");
        data.append("manga", chapterHolder.attr("data-id"));
        chapters = this.getChaptersAjax(mangaId, `${this.baseUrl}/wp-admin/admin-ajax.php`, data);
      }

      return chapters.then(chapters => make<Manga>({
        source: this.id,
        id: mangaId,
        title: $("div.post-title h1").first().text().trim(),
        altTitles: $(".post-content_item:contains(Alt) .summary-content").text().trim().split(", "),
        cover: this.getImage($("div.summary_image img").first()),
        authors: $("div.author-content > a").map((i, e) => $(e).text()).get(),
        artists: $("div.artist-content > a").map((i, e) => $(e).text()).get(),
        tags: $("div.genres-content a").map((i, e) => $(e).text()).get(),
        description: $("div.description-summary div.summary__content").text().trim(),
        status: MangaStatus.UNKNOWN,
        chapters: chapters
      }));
    });
  }

  getPages(mangaId: string, chapterId: string): Promise<Page[]> {
    return fetcher.cheerio(`${this.baseUrl}/manga/${mangaId}/chapter-${chapterId}?style=list`)
      .then($ => $("div.page-break, li.blocks-gallery-item")
        .map((i, e) => make<Page>({
          index: i,
          url: this.getImage($(e).children("img").first())
        }))
        .get()
      );
  }
}