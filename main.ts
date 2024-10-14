import "jsr:@std/dotenv/load"
import { getItems } from "./controllers/crudController.ts";

const PORT = Number(Deno.env.get("PORT")) || 4242;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method === "GET" && path === "/") {
    const id = Number(url.searchParams.get("id"));
    return await getItems(id);
  } else {
    return new Response("Not Found", { status: 404 });
  }
}

Deno.serve({ port: PORT }, handler);