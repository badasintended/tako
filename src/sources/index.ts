import { GuyaSource } from "tako/sources/guya";
import { CatMangaSource } from "tako/sources/catmanga";
import type { Source } from "tako/api/source";

export const sources: Record<string, Source> = {};
export const url2source: Record<string, Source> = {};

reg("catmanga", new CatMangaSource());
reg("coloredcouncil", new GuyaSource("https://coloredcouncil.moe"));
reg("danke", new GuyaSource("https://danke.moe"));
reg("guya", new GuyaSource("https://guya.moe"));
reg("hachirumi", new GuyaSource("https://hachirumi.com"));
reg("magicaltrans", new GuyaSource("https://mahoushoujobu.com"));

function reg(id: string, source: Source) {
  source.id = id;
  sources[id] = source;
  url2source[new URL(source.baseUrl).host] = source;
}
