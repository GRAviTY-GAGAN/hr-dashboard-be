const mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({
  employeId: { type: String },
  todoArr: { type: Array },
});
