require("dotenv").config();

import Koa, { Context } from "koa";
import cors from "koa2-cors";
import logger from "koa-logger";
import koaBody from "koa-body";
import createRoutes from "./routes";
import MongoDB from "./db";

MongoDB.getInstance()
  .connect()
  .catch((e) => console.log({ error: e }));

const app = new Koa();

app.use(koaBody());
app.use(
  cors({
    origin: "*",
  })
);

app.use(logger());
createRoutes(app);

app.listen(5910, function () {
  console.log("Server running on https://localhost:5910");
});
