import Koa from "koa";

type raiseErrorProps = {
  message: any;
  status: number;
  ctx: Koa.Context;
  next: () => Promise<any>;
};

type okProps = {
  body?: any | undefined;
  ctx: Koa.Context;
  next: () => Promise<any>;
};

abstract class BaseController {
  public async raiseError({
    message,
    status,
    ctx,
    next,
  }: raiseErrorProps): Promise<any> {
    ctx.status = status;
    ctx.body = {
      message,
      status,
    };

    await next();
  }

  public async ok({ ctx, next, body = "" }: okProps): Promise<any> {
    ctx.status = 200;
    ctx.body = body;

    await next();
  }

  abstract edit(ctx: Koa.Context, next: any): Promise<any>;
  abstract save(ctx: Koa.Context, next: any): Promise<any>;
  abstract delete(ctx: Koa.Context, next: any): Promise<any>;
  abstract getOne(ctx: Koa.Context, next: any): Promise<any>;
  abstract getAll(ctx: Koa.Context, next: any): Promise<any>;
  // list(): Promise<any>;
}

export default BaseController;
