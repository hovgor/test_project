const { Router } = require("express");
const jwtMiddleware = require("../middlewares/jwt-validation");
const { validateSchema } = require("../middlewares/yupMiddleware");
const loginSchema = require("../schema/authSchema");
const registerSchema = require("../schema/userSchema");
const router = new Router();
const knex = require("../db/db");
const sha1 = require("sha1");
const jwt = require("jsonwebtoken");
router.post(
  "/register",
  validateSchema(registerSchema),
  async (req, res, next) => {
    try {
      const { fullName, email, password } = req.body;

      const checkEmail = await knex("user")
        .select()
        .where({
          email,
        })
        .first();

      if (checkEmail) {
        req.customStatus = 422;
        next(new Error("Email already in use"));
      }

      await knex("user").insert({
        full_name: fullName,
        email: email,
        password: sha1(password),
      });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", validateSchema(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await knex("user")
      .select()
      .where({
        email: email,
        password: sha1(password),
      })
      .first();
    if (!checkUser) {
      req.customStatus = 404;
      next(new Error("No user found"));
    }
    const secretKey = process.env.JWT_SECRET;
    const token = await jwt.sign(
      {
        id: checkUser.id,
        name: checkUser.full_name,
      },
      secretKey
    );
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", jwtMiddleware, async (req, res, next) => {
  try {
    const token = req.token;
    await knex("token_blacklist")
      .insert({
        token: sha1(token),
      })
      .onConflict("token")
      .ignore();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
