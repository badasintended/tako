import type { ServerRequest } from "@sveltejs/kit/types/hooks";
import type { EndpointOutput } from "@sveltejs/kit";
import { url2source } from "tako/sources";

export async function get(req: ServerRequest): Promise<EndpointOutput> {
  const query = req.query.get("q");
  if (query) {
    const url = new URL(query);
    const src = url2source[url.host];
    if (src) {
      return {
        body: await src.parseUrl(url)
      };
    }
  }
}