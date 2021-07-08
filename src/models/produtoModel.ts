import Mongoose from "mongoose";
import produtoSchema from "../schemas/produtoSchema";

const ProdutoModel = Mongoose.model("Produto", produtoSchema);

export default ProdutoModel;
