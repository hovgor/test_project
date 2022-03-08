const { Router } = require("express");
const authRouter = require("./auth/router.js");
const productRouter = require("./product/router.js");
const errorHandler = require("./middlewares/error-handler.js");

const router = new Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use(errorHandler);

module.exports = router;
