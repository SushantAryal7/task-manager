const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const task = new Task({ title: req.body.title, user: req.user });
  await task.save();
  res.status(201).json(task);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
});

module.exports = router;
