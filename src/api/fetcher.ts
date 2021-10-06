import cheerio from "cheerio";
import Dexie from "dexie";
import { MINUTE } from "tako/api/time-constants";
import Root = cheerio.Root;

type Cache = {
  url: string
  time: number
  body: string
}

class CacheDatabase extends Dexie {
  caches: Dexie.Table<Cache, string>;

  constructor() {
    super("CacheDatabase");
    this.version(1).stores({
      caches: "url"
    });
  }
}

const cache = new CacheDatabase();

async function getCacheOrDefault(
  url: string,
  cacheTime: number,
  fun: (url: string) => Promise<string>
): Promise<string> {
  if (cacheTime <= 0) return fun(url);

  const now = Date.now();
  return cache.caches
    .get(url, it => {
      if (now - it.time >= cacheTime) {
        return fun(url).then(it => {
          cache.caches.update(url, { time: now, body: it });
          return it;
        });
      } else {
        return it.body;
      }
    })
    .catch(() => fun(url).then(it => {
      cache.caches.put({ url, time: now, body: it });
      return it;
    }));
}

export class Fetcher {
  private readonly headers: HeadersInit;

  constructor(headers?: HeadersInit) {
    this.headers = headers;
  }

  raw(url: string, cacheTime = 10 * MINUTE): Promise<string> {
    return getCacheOrDefault(url, cacheTime, url =>
      fetch(cors(url), { headers: this.headers })
        .then(res => res.text()));
  }

  json<T>(url: string, cacheTime = 10 * MINUTE): Promise<T> {
    return this.raw(url, cacheTime).then(JSON.parse);
  }

  cheerio(url: string, cacheTime = 10 * MINUTE): Promise<Root> {
    return this.raw(url, cacheTime).then(cheerio.load);
  }

  next<T>(url: string, cacheTime = 10 * MINUTE): Promise<T> {
    return this.cheerio(url, cacheTime).then($ => JSON.parse($("#__NEXT_DATA__").first().html()));
  }
}

export const fetcher = new Fetcher();

export function cors(url: string): string {
  return `https://cors.bridged.cc/${url}`;
}
