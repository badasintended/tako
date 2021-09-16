import type { EndpointOutput } from "@sveltejs/kit";
import { sources } from "tako/sources";

type SourceMetadata = {
  id: string,
  url: string
}

export async function get(): Promise<EndpointOutput> {
  const srcs = Object.values(sources);
  const metadata: SourceMetadata[] = [];

  for (let i = 0; i < srcs.length; i++) {
    const src = srcs[i];
    metadata[i] = {
      id: src.id,
      url: src.baseUrl
    };
  }

  return {
    body: metadata
  };
}