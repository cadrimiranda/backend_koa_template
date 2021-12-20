import Router from "koa-router";
import ProdutoController from "../controller/produtoController";
import { produtoModelName } from "../models/produtoModel";
import KoaUtils from "../utils/koaUtils";

const router = new Router({
  prefix: `/${produtoModelName}`,
  routerPath: "",
});

const controller = new ProdutoController();
KoaUtils.CreateBaseRoutes(router, controller);

export default router;
