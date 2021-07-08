import mongoose from "mongoose";

class MongoDB {
  constructor() {}

  public connect() {
    return new Promise((accept, reject) => {
      const url = process.env.MONGO_URL_DB;
      console.log({ url });
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
          .then((...props) => {
            console.log("mongo connected");
            accept(...props);
          })
          .catch(reject);
      }
    });
  }
}

class DB {
  private static db: MongoDB | null = null;
  private constructor() {}

  static getInstance() {
    if (this.db) {
      return this.db;
    }

    this.db = new MongoDB();
    return this.db;
  }
}

export default DB;
