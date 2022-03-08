const jwt = require("jsonwebtoken");
const knex = require("../db/db");
const sha1 = require("sha1");
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(403);
  }
  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const blacklistToken = await knex("token_blacklist")
    .select()
    .where({
      token: sha1(token),
    })
    .first();
  if (blacklistToken) {
    return res.sendStatus(403);
  }
  req.userPayload = payload;
  req.token = token;
  next();
};
