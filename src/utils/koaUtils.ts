import Koa from "koa";
import Router from "koa-router";
import BaseController from "./baseController";

type RaiseHttpProps = {
  body: any;
  status: number;
};

export type RouteProps = {
  params?: any;
  body?: any;
  raiseHttp: (props: RaiseHttpProps) => Promise<any>;
  next: () => Promise<any>;
};

class KoaUtils {
  public static AbstractKoaParams(fn: (props: RouteProps) => Promise<any>) {
    return async function (ctx: Koa.Context, next: any) {
      const { params, request } = ctx;
      const { body } = request;

      async function raiseHttp({ body, status }: RaiseHttpProps) {
        ctx.status = status;
        ctx.body = body;

        await next();
      }

      await fn({ params, body, next, raiseHttp });
    };
  }

  public static CreateBaseRoutes(
    router: Router<any, any>,
    controller: BaseController
  ) {
    router.get("/list", this.AbstractKoaParams(controller.listCheckbox));
    router.put("/", this.AbstractKoaParams(controller.edit));
    router.post("/", this.AbstractKoaParams(controller.save));
    router.get("/getone/:id", this.AbstractKoaParams(controller.getOne));
    router.delete("/:id", this.AbstractKoaParams(controller.delete));
    router.post("/getall", this.AbstractKoaParams(controller.getAll));
    router.delete("/", this.AbstractKoaParams(controller.deleteManyById));
  }
}

export default KoaUtils;
