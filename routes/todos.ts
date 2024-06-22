import { Router } from "express";

import { Todo } from "../model/todo";

let todos: Todo[] = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    title: req.body.title,
  };

  todos.push(newTodo);
  res.status(201).json({ message: "Todo added", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const todoId = req.params.todoId;
  const updatedTitle = req.body.title;

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, title: updatedTitle };
    res.status(200).json({ message: "Todo updated", todos: todos });
  }
  res.status(404).json({ message: "Could not find todo for this id." });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const todoId = req.params.todoId;
  todos = todos.filter((todo) => todo.id !== todoId);
  res.status(200).json({ message: "Todo deleted", todos: todos });
});

export default router;
