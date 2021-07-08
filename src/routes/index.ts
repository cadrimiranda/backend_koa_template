import Koa from "koa";

import produtoRotas from "./produtosRotas";

function createRoutes(app: Koa) {
  app.use(produtoRotas.routes());
}

export default createRoutes;
