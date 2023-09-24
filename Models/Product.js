const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: String,
  nom: String,
  reference: String,
  MontantHT: String,
  MontantTTC: String,
  Quantite: String,
  id_fournisseur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseur",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
