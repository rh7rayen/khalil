var express = require("express");
var router = express.Router();
const axios = require("axios");
const Code = require("../Models/Code");
const Product = require("../Models/Product");
const Fournisseur = require("../Models/Fournisseur");
const Categorie = require("../Models/Categorie");

const ExcelJS = require("exceljs");
const fs = require("fs");
const csv = require("csv-parser");

const genToken = async () => {
  const result = await axios
    .post(
      "https://api.orange.com/oauth/v3/token",
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Authorization: process.env.TOKEN_AUTH,
          Accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => res.data);
  return result.access_token;
};
/* GET home page. */
router.post("/sms", async function (req, res, next) {
  const token = await genToken();
  const devPhoneNumber = process.env.NUMBER_DEV;
  const recipient = req.body.number;
  const message = req.body.message;
  let code = req.body.code;
  console.log(code);
  const newCode = new Code({
    numero: code,
  });

  await newCode.save();
  axios
    .post(
      `https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B${devPhoneNumber}/requests`,
      {
        outboundSMSMessageRequest: {
          address: `tel:+216${recipient}`,
          senderAddress: `tel:+${devPhoneNumber}`,
          outboundSMSTextMessage: {
            message: message,
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    )
    .then((result) => res.send("success"))
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .send(err.response.data.requestError.serviceException.variables);
    });
});
router.get("/GetProduct", async (req, res) => {
  try {
    const products = await Product.find().limit(9);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/product", async (req, res) => {
  try {
    let t = [
      "https://retoolapi.dev/ZjMmLU/data",
      "https://retoolapi.dev/Sh4nAP/data",
      "https://retoolapi.dev/jen5mW/data",
      "https://retoolapi.dev/E0EJIf/data",
      "https://retoolapi.dev/3Aw32c/data",
      "https://retoolapi.dev/X59P12/data",
      "https://retoolapi.dev/qIJxFh/data",
      "https://retoolapi.dev/hw4Gnz/data",
      "https://retoolapi.dev/f84Dnt/data",
      "https://retoolapi.dev/GHwWqj/data",
      "https://retoolapi.dev/FjEQKj/data",
      "https://retoolapi.dev/5NYrnP/data",
      "https://retoolapi.dev/nWn7Ne/data",
      "https://retoolapi.dev/jMgW8u/data",
      "https://retoolapi.dev/nJ255W/data",
      "https://retoolapi.dev/naNZn3/data",
      "https://retoolapi.dev/Qjmxzd/data",
      "https://retoolapi.dev/Sbz3x2/data",
      "https://retoolapi.dev/K6pTd2/data",
      "https://retoolapi.dev/LuntPg/data",
      "https://retoolapi.dev/UV15Gk/data",
      "https://retoolapi.dev/PHKebG/data",
      "https://retoolapi.dev/NmL4qf/data",
      "https://retoolapi.dev/LIsgAo/data",
      "https://retoolapi.dev/E4ROSf/data",
      "https://retoolapi.dev/0ecw5b/data",
      "https://retoolapi.dev/c2kEbW/data",
    ];
    let i = 0;
    do {
      const response = await axios.get(t[i]);
      const apiData = response.data;
      i++;
    } while (i < t.length);

    for (const item of apiData) {
      const product = new Product({
        nom: item.Nom,
        image: item.Image,
        reference: item.Reference,
        MontantHT: item.MontantHT,
        MontantTTC: item.MontantTTC,
        Quantite: item.Quantite,
        id_fournisseur: "64f75552595de52078a443bd",
      });

      // Save the product to the database
      await product.save();
      console.log(`Product "${item.Nom}" saved successfully`);

      // Create a new category instance and associate it with the product
      const categorie = new Categorie({
        name: item.Catégorie,
        id_product: product._id, // Use the _id of the saved product
      });

      // Save the category to the database
      await categorie.save();
      console.log(`Category "${item.Catégorie}" saved successfully`);
    }

    console.log("All products and categories inserted successfully");
  } catch (error) {
    console.error("Error fetching or inserting data:", error);
  }
});
module.exports = router;
