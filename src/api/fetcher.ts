import fetch from "node-fetch";
import cheerio from "cheerio";

let lastCache = 0;
let cache: Record<string, string> = {};

function getCacheOrDefault(
  url: string,
  fun: (url: string) => Promise<string>
): Promise<string> {
  const now = Date.now();
  if (now - lastCache >= 60000) {
    lastCache = now;
    cache = {};
  }

  if (!cache[url]) {
    console.log(`sent request to ${url}`);
    return fun(url).then((it) => (cache[url] = it));
  } else {
    return Promise.resolve(cache[url]);
  }
}

/**
 * Get raw text from a page
 */
export function getText(url: string): Promise<string> {
  return getCacheOrDefault(url, (url) => fetch(url).then((res) => res.text()));
}

/**
 * Get HTML element from a page
 */
export function getHtml(
  url: string,
  selector?: string
): Promise<cheerio.Cheerio> {
  return getText(url).then((html) => {
    const $ = cheerio.load(html);
    return selector ? $(selector) : $.root();
  });
}

/**
 * Get page data from Next.js based websites
 */
export function getNextData(url: string): Promise<any> {
  return getHtml(url, "#__NEXT_DATA__").then((it) => JSON.parse(it.html()));
}
