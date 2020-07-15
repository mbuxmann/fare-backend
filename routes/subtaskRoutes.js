const express = require("express");
const mongoose = require("mongoose");

const todoCard = mongoose.model("todoCard");

const router = express.Router();

router.get("/todocards/:todocardId/subtasks", async (req, res) => {
  try {
    const todocard = await todoCard.findOne({ _id: req.params.todocardId });
    res.send(todocard.subtasks);
  } catch (err) {
    response.state(500).send(err);
  }
});

router.post("/todocards/:todocardId/subtasks", async (req, res) => {
  const { id, title } = req.body;

  if (!id && !title) {
    return res
      .status(422)
      .send({ error: "Need an id and title for the subtask" });
  } else if (!title) {
    return res.status(422).send({ error: "Need a title for the subtask" });
  } else if (!id) {
    return res.status(422).send({ error: "Need an id for the subtask" });
  }

  try {
    const todocard = await todoCard.findOne({ _id: req.params.todocardId });
    todocard.subtasks.unshift({ id, title, completed: false });
    await todocard.save();
    res.send(todocard.subtasks);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.delete("/todocards/:todocardId/subtasks", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(422).send({ error: "Need an subtask id" });
  }

  try {
    const todocard = await todoCard.findOne({ _id: req.params.todocardId });
    todocard.subtasks = todocard.subtasks.filter(
      (subtask) => subtask.id !== id
    );
    await todocard.save();
    res.send(todocard);
  } catch (err) {
    res.status(404).send({ error: "Subtask id doesn't exists!" });
  }
});

router.patch("/todocards/:todocardId/subtasks/", async (req, res) => {
  const { id, title, completed } = req.body;

  if (!id) {
    return res.status(422).send({ error: "Need an subtask id" });
  }

  if (!title) {
    try {
      const todocard = await todoCard.findOne({ _id: req.params.todocardId });
      todocard.subtasks = todocard.subtasks.filter(
        (subtask) => subtask.id !== id
      );
      await todocard.save();
      res.send(todocard);
    } catch (err) {
      res.status(404).send({ error: "Subtask id doesn't exists!" });
    }
  }

  try {
    const todocard = await todoCard.findOne({ _id: req.params.todocardId });
    todocard.subtasks = todocard.subtasks.map((subtask) => {
      return subtask.id === id ? { id, title, completed } : subtask;
    });
    await todocard.save();
    res.send(todocard);
  } catch (err) {
    res.status(404).send({ error: "Subtask doesn't exists!" });
  }
});

module.exports = router;
