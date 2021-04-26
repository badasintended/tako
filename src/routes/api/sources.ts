import * as sources from "sources";

import type { Request, Response } from "@sveltejs/kit";

export async function get(req: Request<never, never>): Promise<Response> {
  return { body: sources };
}
