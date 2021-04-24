import type { Request, Response } from "@sveltejs/kit";
import * as sources from "tako/sources";

export async function get(req: Request<any, any>): Promise<Response> {
  return {
    body: sources
  };
}
