import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello, World!";
});

await app.listen({ port: 8000 });

// function handler(_req: Request): Response {
//   return new Response("Hello, World!");
// }
// Deno.serve(handler);
