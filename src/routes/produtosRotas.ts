import Router from "koa-router";
import ProdutoController from "../controller/produtoController";
import KoaUtils from "../utils/koaUtils";
const router = new Router();

const controller = new ProdutoController();
KoaUtils.CreateBaseRoutes(router, controller);

export default router;
