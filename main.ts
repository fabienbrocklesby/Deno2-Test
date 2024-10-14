import "jsr:@std/dotenv/load"
import { getAllItems, getItemById } from "./controllers/crudController.ts";

const PORT = Number(Deno.env.get("PORT")) || 4242;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method === "GET" && path === "/task") {
    const id = Number(url.searchParams.get("id"));
    return await getItemById(id);
  } else if (req.method === "GET" && path === "/tasks") {
    return await getAllItems();
  } else {
    return new Response("Not Found", { status: 404 });
  }
}

Deno.serve({ port: PORT }, handler);