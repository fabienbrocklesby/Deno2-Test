import { CrudModel } from "../models/crudModel.ts";

async function getAllItems(): Promise<Response> {
  const items = CrudModel.readAll();
  
  return new Response(JSON.stringify(items), { 
    status: 200, 
    headers: { "Content-Type": "application/json" } 
  });
}

async function getItemById(id: number): Promise<Response> {
  const item = CrudModel.read(id || 0);
  
  if (item) {
    return new Response(JSON.stringify(item), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  } else {
    return new Response("Item not found", { status: 404 });
  }
}

export { getAllItems, getItemById };