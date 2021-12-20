import Koa from "koa";
import BaseModel, { modelErrorsType } from "./baseModel";
import { RouteProps } from "./koaUtils";

type raiseErrorProps = {
  message: any;
  status: number;
  ctx: Koa.Context;
  next: () => Promise<any>;
};

abstract class BaseController {
  model: BaseModel = {} as BaseModel;

  constructor(controllerModel: BaseModel) {
    this.model = controllerModel;
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getAll = this.getAll.bind(this);
    this.deleteManyById = this.deleteManyById.bind(this);
    this.listCheckbox = this.listCheckbox.bind(this);
  }

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

  public async edit(props: RouteProps): Promise<any> {
    const { body, raiseHttp } = props;

    if (!body) {
      return raiseHttp({
        body: "Missing body",
        status: 400,
      });
    }

    if (!body) {
      return raiseHttp({
        body: "ID is missing",
        status: 400,
      });
    }

    await this.model.editOneById(body, (res, err) => {
      if (err) {
        return raiseHttp({
          status: 400,
          body: err.message,
        });
      }
      return raiseHttp({ status: 200, body: res });
    });
  }

  public async save(props: RouteProps): Promise<any> {
    const { body, raiseHttp } = props;

    if (!body) {
      return raiseHttp({
        status: 400,
        body: "Missing body",
      });
    }

    await this.model.saveOne(body, async (err) => {
      if (err) {
        if (err.type === modelErrorsType.validation) {
          await raiseHttp({
            status: 400,
            body: err.message.errors,
          });
          return;
        }

        await raiseHttp({
          status: 400,
          body: err.message,
        });
        return;
      }

      await raiseHttp({ status: 200, body: "" });
    });
  }

  public async delete(props: RouteProps): Promise<any> {
    const { params, raiseHttp } = props;

    if (!params.id || params.id?.length === 0) {
      return raiseHttp({
        status: 400,
        body: "no _id informed to delete",
      });
    }

    await this.model.deleteOneById(params.id, (result, err) => {
      if (err) {
        return raiseHttp({
          status: 400,
          body: err,
        });
      }

      return raiseHttp({ status: 200, body: result });
    });
  }

  public async getOne(props: RouteProps): Promise<any> {
    const { params, raiseHttp } = props;

    if (!params.id || params.id?.length === 0) {
      return raiseHttp({
        status: 400,
        body: "no _id informed to get one",
      });
    }

    await this.model.getOneById({
      id: params.id,
      shouldPopulate: params.relations,
      callback: (produto, err) => {
        if (produto) {
          return raiseHttp({ status: 200, body: produto });
        } else if (err) {
          return raiseHttp({
            status: 400,
            body: err.message,
          });
        } else {
          return raiseHttp({
            status: 400,
            body: `Item with id ${params.id} was not found`,
          });
        }
      },
    });
  }

  public async getAll(props: RouteProps): Promise<any> {
    const { raiseHttp, body } = props;

    if (!body) {
      return raiseHttp({
        status: 400,
        body: "Missing body",
      });
    }

    const { relations, ...restBody } = body;

    await this.model.getAll({
      data: restBody,
      shouldPopulate: relations,
      callback: (docs, err) => {
        if (docs) {
          return raiseHttp({ status: 200, body: docs });
        }

        return raiseHttp({
          status: 400,
          body: err?.message,
        });
      },
    });
  }

  public async deleteManyById(props: RouteProps): Promise<any> {
    const { body, raiseHttp } = props;

    if (!body) {
      return raiseHttp({
        status: 400,
        body: "Missing body",
      });
    }

    await this.model.deleteManyById(JSON.parse(body) || {}, (result, err) => {
      if (err) {
        return raiseHttp({
          status: 400,
          body: err?.message,
        });
      }

      return raiseHttp({ status: 200, body: result });
    });
  }

  public async listCheckbox(props: RouteProps): Promise<any> {
    const { raiseHttp, body } = props;

    await this.model.getAll({
      data: body,
      callback: (docs, err) => {
        if (docs) {
          return raiseHttp({
            status: 200,
            // @ts-ignore
            body: docs.map((x) => ({ value: x._id, label: x.nome })),
          });
        }

        return raiseHttp({
          status: 400,
          body: err?.message,
        });
      },
    });
  }
}

export default BaseController;
