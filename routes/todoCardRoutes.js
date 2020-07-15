const express = require("express");
const mongoose = require("mongoose");

const todoCard = mongoose.model("todoCard");

const router = express.Router();

router.get("/todocards", async (req, res) => {
  try {
    const todocards = await todoCard.find();
    res.send(todocards.reverse());
  } catch (err) {
    response.status(500).send(err);
  }
});

router.get("/todocards/:id", async (req, res) => {
  try {
    const todocard = await todoCard.findOne({ _id: req.params.id });
    res.send(todocard);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.post("/todocards", async (req, res) => {
  const { title, description, completed, subtasks } = req.body;

  if (!title) {
    return res.status(422).send({ error: "Need a title for the todocard" });
  }

  try {
    const todocard = new todoCard({ title, description, completed, subtasks });
    await todocard.save();
    res.send(todocard);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.patch("/todocards", async (req, res) => {
  const { id, title, description, completed } = req.body;

  try {
    const todocard = await todoCard.findOne({ _id: id });

    if (title) {
      todocard.title = req.body.title;
    }

    if (description) {
      todocard.description = req.body.description;
    }

    if (completed != null) {
      todocard.completed = req.body.completed;
    }

    await todocard.save();
    res.send(todocard);
  } catch {
    res.status(404).send({ error: "Todocard doesn't exist!" });
  }
});

router.delete("/todocards/", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(422).send({ error: "Need an id" });
  }

  try {
    await todoCard.deleteOne({ _id: id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Todocard doesn't exists!" });
  }
});

module.exports = router;
