import fetch from "node-fetch";
import cheerio from "cheerio";

let lastCache = 0;
let cache: Record<string, string> = {};

export function getRaw(url: string): Promise<string> {
  return getCacheOrDefault(url, url => fetch(url).then(res => res.text()));
}

export function getJson<T>(url: string): Promise<T> {
  return getRaw(url).then(JSON.parse);
}

export function getHtml(url: string, selector?: string): Promise<cheerio.Cheerio> {
  return getRaw(url).then((html) => {
    const $ = cheerio.load(html);
    return selector ? $(selector) : $.root();
  });
}

export function getNextData<T>(url: string): Promise<T> {
  return getHtml(url, "#__NEXT_DATA__")
    .then(it => JSON.parse(it.html()));
}

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
