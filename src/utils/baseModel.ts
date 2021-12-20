import { Document, FilterQuery, Model, Schema } from "mongoose";
import DB from "../db";

type emptyObj = Record<string, unknown>;

type ModelType = Model<Document, emptyObj, emptyObj>;

type errorObject = {
  type: modelErrorsType;
  message: any;
};

type errorReturn = null | errorObject;

export enum modelErrorsType {
  validation = 1,
  message = 2,
  database = 3,
}

type EditOneByIdProps = {
  id: string;
  [key: string]: any;
};

interface IDefault {
  shouldPopulate?: boolean;
}

interface IGetOneById extends IDefault {
  id: string;
  callback: (doc: Document | null, err: errorObject | null) => void;
}

interface IGetAll extends IDefault {
  data: any;
  callback: (docs: Document[] | null, err: errorObject | null) => void;
}

class BaseModel {
  _model: ModelType = {} as ModelType;
  _relations: string[] = [];

  constructor(
    name: string,
    schema: Schema<any>,
    modelRelations: string[] = []
  ) {
    const model = DB.getInstance().createModel(name, schema);
    this._model = model;
    this._relations = modelRelations;

    this.getAll = this.getAll.bind(this);
    this.saveOne = this.saveOne.bind(this);
    this.getOneById = this.getOneById.bind(this);
    this.editOneById = this.editOneById.bind(this);
    this.deleteOneById = this.deleteOneById.bind(this);
    this.deleteManyById = this.deleteManyById.bind(this);
  }

  private createGenericError(errors: any) {
    return {
      type: modelErrorsType.database,
      message: errors,
    };
  }

  public async getOneById({ id, shouldPopulate, callback }: IGetOneById) {
    const populateRelations = shouldPopulate ? this._relations : [];

    await this._model
      .findById(id)
      .populate(populateRelations.map((path) => ({ path })))
      .then((doc) => callback(doc, null))
      .catch((err) => {
        if (
          err.message
            .toLocaleLowerCase()
            .includes("cast to objectid failed for value")
        ) {
          callback(null, {
            type: modelErrorsType.database,
            message: `Object with id: ${id} is not found`,
          });
        } else {
          callback(null, this.createGenericError(err.message));
        }
      });
  }

  public async editOneById(
    data: EditOneByIdProps,
    callback: (
      result: { ok: boolean; count: number } | null,
      err: errorReturn
    ) => void
  ) {
    const _model = this._model;
    const { id, ...rest } = data;
    await _model
      .updateOne({ _id: id }, rest)
      .then((result) =>
        callback({ ok: result.n === 1, count: result.nModified }, null)
      )
      .catch((err) => callback(null, this.createGenericError(err)));
  }

  public async saveOne(data: any, callback: (err: errorReturn) => void) {
    const _model = this._model;
    const model = new _model(data);
    const errors = model.validateSync();
    if (errors) {
      await callback({ type: modelErrorsType.validation, message: errors });
      return;
    }

    await model
      .save()
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(this.createGenericError(err));
      });
  }

  public async deleteOneById(
    id: string,
    callback: (
      result: { ok: boolean; count: number } | null,
      err: errorReturn
    ) => void
  ) {
    await this._model
      .deleteOne({ _id: id })
      .then((res) =>
        callback({ ok: res.ok === 1, count: res.deletedCount || 0 }, null)
      )
      .catch((err) => callback(null, this.createGenericError(err.message)));
  }

  public async deleteManyById(
    ids: string[],
    callback: (
      result: { ok: boolean; count: number } | null,
      err: errorReturn
    ) => void
  ) {
    await this._model
      .deleteMany({ _id: { $in: ids } })
      .then((res) => callback({ ok: true, count: res.deletedCount || 0 }, null))
      .catch((err) => callback(null, this.createGenericError(err.message)));
  }

  public async getAll({ data, shouldPopulate, callback }: IGetAll) {
    const populateRelations = shouldPopulate ? this._relations : [];
    return await this._model
      .find(data)
      .populate(populateRelations.map((path) => ({ path })))
      .then((docs) => callback(docs, null))
      .catch((err) => {
        return callback(null, this.createGenericError(err.message));
      });
  }
}

export default BaseModel;
