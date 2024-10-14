import "jsr:@std/dotenv/load"
import router from "./router.ts";

const PORT = Number(Deno.env.get("PORT")) || 4242;

const handler = async (req: Request) => {
  try {
    return await router(req);
  } catch (error) {
    return new Response(String(error), { status: 500 });
  }
};

Deno.serve({ port: PORT }, handler);