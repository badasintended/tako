import * as sources from "sources";

import type { Request, Response } from "@sveltejs/kit";

export async function get(req: Request<any, any>): Promise<Response> {
  return { body: sources };
}
