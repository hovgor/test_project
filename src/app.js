const express = require("express");
const router = require("./router");
require("dotenv").config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use("/api", router);
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
