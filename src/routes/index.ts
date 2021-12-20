import Koa from "koa";

import produtoRotas from "./produtosRotas";
const routes = [produtoRotas];

function createRoutes(app: Koa) {
  routes.forEach((route) => app.use(route.routes()));
}

export default createRoutes;
