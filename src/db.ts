import mongoose from "mongoose";

class MongoDB {
  constructor() {}

  public connect() {
    return new Promise((accept, reject) => {
      mongoose
        .connect("mongodb://localhost:27017/web-app")
        .then((...props) => {
          console.log("mongo connected");
          accept(...props);
        })
        .catch(reject);
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
