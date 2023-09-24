// Code.js

const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  id_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

const Categorie = mongoose.model("categorie", categorieSchema);

module.exports = Categorie;
