const express = require("express");

const router = express.Router();

let todos = [];

router.get("/", (req, res) => {
  res.json({
    todos: todos,
  });

  res.status(200).json({
    todos: todos,
  });
});

router.post("/", (req, res) => {
  const newTodo = { id: new Date().toISOString(), title: req.body.text };

  todos.push(newTodo);

  res.status(201).json({
    message: "Todo added successfully!",
    todo: newTodo,
    todos: todos,
  });
});

router.put("/:id", (req, res) => {
  const todoId = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  todos[todoIndex] = { id: todos[todoIndex].id, title: req.body.text };

  res.status(200).json({
    message: "Todo updated successfully!",
    todos: todos,
  });
});

router.delete("/:id", (req, res) => {
  const todoId = req.params.id;
  todos = todos.filter((todo) => todo.id !== todoId);
  res.status(200).json({
    message: "Todo deleted successfully!",
    todos: todos,
  });
});

module.exports = router;
