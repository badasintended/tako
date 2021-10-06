import { Guya } from "tako/sources/guya";
import { CatManga } from "tako/sources/catmanga";
import type { Source } from "tako/api/source";
import { Madara } from "tako/sources/madara";
import { WpMangaReader } from "tako/sources/wpmangareader";
import { MangaDex } from "tako/sources/mangadex";

// @formatter:off
export const sources: Record<string, Source> = {
  catmanga: new CatManga(),
  mangadex: new MangaDex(),

  coloredcouncil: new Guya("https://coloredcouncil.moe"),
  danke         : new Guya("https://danke.moe"),
  guya          : new Guya("https://guya.moe"),
  hachirumi     : new Guya("https://hachirumi.com"),
  magicaltrans  : new Guya("https://mahoushoujobu.com"),

//mangasushi: new Madara("https://mangasushi.net", { newAjax: true }),
  xun       : new Madara("https://xunscans.xyz"),

  anitationarts: new WpMangaReader("https://anitationarts.org")
};
// @formatter:on

export const url2source: Record<string, Source> = {};

for (const id in sources) {
  const source = sources[id];
  source.id = id;
  url2source[new URL(source.baseUrl).host] = source;
}
