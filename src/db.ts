import mongoose, { Schema } from "mongoose";

class MongoDB {
  private connection: typeof mongoose = {} as typeof mongoose;

  public connect() {
    return new Promise((accept, reject) => {
      try {
        const url = process.env.MONGO_URL_DB;
        if (!url) {
          console.error("ERROR: Não foi encontrado a url mongoDB");
          reject("ERROR: Não foi encontrado a url mongoDB");
        } else {
          mongoose
            .connect(url as string, {
              useNewUrlParser: true,
              useFindAndModify: false,
              useUnifiedTopology: true,
            })
            .then((mongoConnection) => {
              this.connection = mongoConnection;
              console.log("mongo connected");
              accept(this.connection);
            }, reject);
        }

        if (this.connection) {
          accept(this.connection);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  public createModel<T>(name: string, schema: Schema<T>) {
    const model = mongoose.model<T>(name, schema);
    return model;
  }
}

class DB {
  private static db: MongoDB | null = null;

  static getInstance() {
    if (this.db) {
      return this.db;
    }

    this.db = new MongoDB();
    return this.db;
  }
}

export default DB;
