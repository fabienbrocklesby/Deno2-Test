import { getAllItems, getItemById, createItem, updateItem } from "./controllers/crudController.ts";

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method === "GET" && path === "/task") {
    const id = Number(url.searchParams.get("id"));
    return await getItemById(id);
  } else if (req.method === "GET" && path === "/tasks") {
    return await getAllItems();
  } else if (req.method === "POST" && path === "/task") {
    return await createItem(req);
  } else if (req.method === "PUT" && path === "/task") {
    const id = Number(url.searchParams.get("id"));
    return await updateItem(id, req);
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
