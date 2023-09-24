// Code.js

const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
});

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
