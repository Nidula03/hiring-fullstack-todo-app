const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.use((req, res, next) => {
  req.io = req.app.get("io");
  next();
});

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new todo
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const todo = new Todo({
    title,
    description: description || "",
  });

  try {
    const newTodo = await todo.save();
    // Broadcast to all connected clients
    req.io.emit("todo:created", newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a todo
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (req.body.title !== undefined) todo.title = req.body.title;
    if (req.body.description !== undefined) todo.description = req.body.description;

    const updatedTodo = await todo.save();
    // Broadcast to all connected clients
    req.io.emit("todo:updated", updatedTodo);
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH toggle done status
router.patch("/:id/done", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.done = !todo.done;
    const updatedTodo = await todo.save();
    // Broadcast to all connected clients
    req.io.emit("todo:toggled", updatedTodo);
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await Todo.findByIdAndDelete(req.params.id);
    // Broadcast to all connected clients
    req.io.emit("todo:deleted", req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
