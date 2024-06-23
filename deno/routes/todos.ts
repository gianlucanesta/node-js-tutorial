import { RouterContext, Router } from "@oak/oak";
type MyRouterContext = RouterContext<string, Record<string, string>>;
const router = new Router<MyRouterContext>();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", (ctx: MyRouterContext) => {
  ctx.response.body = { todos: todos };
  console.log("CTX", ctx.response.body);
});

router.post("/todos", async ({ request, response }: MyRouterContext) => {
  const body = await request.body().value;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  response.body = { message: "Created todo!", todo: newTodo };
});

// router.put("/todos/:todoId", async (ctx: Context) => {
//   const tid = ctx.params.todoId;
//   const data = await ctx.request.body().value;
//   const todoIndex = todos.findIndex((todo) => {
//     return todo.id === tid;
//   });
//   todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };
//   ctx.response.body = { message: "Updated todo" };
// });

// router.delete("/todos/:todoId", (ctx: Context) => {
//   const tid = ctx.params.todoId;
//   todos = todos.filter((todo) => todo.id !== tid);
//   ctx.response.body = { message: "Deleted todo" };
// });

export default router;
