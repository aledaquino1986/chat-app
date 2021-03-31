const express = require("express");
const config = require("./config/app");
const router = require("./router/index");
const cors = require("cors");
const app = express();
const port = config.appPort;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log("server working on port " + port);
});
