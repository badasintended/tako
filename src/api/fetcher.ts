import cheerio from "cheerio";
import Root = cheerio.Root;

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
    return fun(url).then((it) => (cache[url] = it));
  } else {
    return Promise.resolve(cache[url]);
  }
}

export class Fetcher {
  private readonly headers: HeadersInit;

  constructor(headers?: HeadersInit) {
    this.headers = headers;
  }

  raw(url: string): Promise<string> {
    return getCacheOrDefault(url, url =>
      fetch(cors(url), { headers: this.headers })
        .then(res => res.text()));
  }

  json<T>(url: string): Promise<T> {
    return this.raw(url).then(JSON.parse);
  }

  cheerio(url: string): Promise<Root> {
    return this.raw(url).then(cheerio.load);
  }

  next<T>(url: string): Promise<T> {
    return this.cheerio(url).then($ => JSON.parse($("#__NEXT_DATA__").first().html()));
  }
}

export const fetcher = new Fetcher();

export function cors(url: string): string {
  return `https://cors.bridged.cc/${url}`;
}
