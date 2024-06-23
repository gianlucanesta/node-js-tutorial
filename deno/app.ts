import { Application, Context } from "@oak/oak";

import router from "./routes/todos.ts";

const app = new Application();

app.use(async (ctx: Context, next) => {
  console.log("Middleware!");
  console.log(ctx);
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on port 3000");

await app.listen({ port: 3000 });
