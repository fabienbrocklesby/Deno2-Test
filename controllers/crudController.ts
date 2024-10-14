import { CrudModel } from "../models/crudModel.ts";

async function getAllItems(): Promise<Response> {
  const items = await CrudModel.readAll();
  
  return new Response(JSON.stringify(items), { 
    status: 200, 
    headers: { "Content-Type": "application/json" } 
  });
}

async function getItemById(id: number): Promise<Response> {
  const item = await CrudModel.read(id || 0);
  
  if (item) {
    return new Response(JSON.stringify(item), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  } else {
    return new Response("Item not found", { status: 404 });
  }
}

async function createItem(req: Request): Promise<Response> {
  const body = await req.json();
  const item = await CrudModel.create(body);
  
  return new Response(JSON.stringify(item), { 
    status: 201, 
    headers: { "Content-Type": "application/json" } 
  });
}

async function updateItem(id: number, req: Request): Promise<Response> {
  const body = await req.json();
  const success = await CrudModel.update(id || 0, body);
  
  if (success) {
    return new Response("Item updated", { status: 200 });
  } else {
    return new Response("Item not found", { status: 404 });
  }
}

export { getAllItems, getItemById, createItem, updateItem };