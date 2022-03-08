const { Router } = require("express");
const jwtValidation = require("../middlewares/jwt-validation");
const productSchema = require("../schema/productSchema");
const knex = require("../db/db");
const router = new Router();

router.get("/my", jwtValidation, async (req, res, next) => {
  const userID = req.userPayload.id;
  const products = await knex("product").select().where({
    user_id: userID,
  });
  res.json({ products });
});

router.get("/all", async (req, res, next) => {
  const products = await knex("product").select();
  res.json({ products });
});

router.post("/", jwtValidation, async (req, res, next) => {
  const user = req.userPayload;
  const { price, category, description, productName } = req.body;
  const product = await knex("product")
    .insert({
      name: productName,
      description: description,
      price: price,
      category: category,
      user_id: user.id,
    })
    .returning("*");
  res.json({ product: product[0] });
});

module.exports = router;
