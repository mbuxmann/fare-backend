const mongoose = require("mongoose");

const todoCardSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  completed: Boolean,
  subtasks: [{}],
});

mongoose.model("todoCard", todoCardSchema);
