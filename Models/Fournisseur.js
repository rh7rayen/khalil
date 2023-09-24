const mongoose = require("mongoose");

const fournisseurSchema = new mongoose.Schema({
  nom: String,
  image: String,
});

const Fournisseur = mongoose.model("fournisseur", fournisseurSchema);

module.exports = Fournisseur;
