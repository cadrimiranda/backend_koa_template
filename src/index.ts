require("dotenv").config();

import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import createRoutes from "./routes";
import MongoDB from "./db";

const app = new Koa();

app.use(bodyParser());
app.use(
  cors({
    origin: "*",
  })
);

app.use(logger());
createRoutes(app);

app.listen(6030, function () {
  console.log("Server running on https://localhost:6030");

  MongoDB.getInstance().connect();
});
