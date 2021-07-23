import produtoSchema from "../schemas/produtoSchema";
import BaseModel from "../utils/baseModel";

// @ts-ignore
const ProdutoModel = new BaseModel("Produto", produtoSchema);

export default ProdutoModel;
