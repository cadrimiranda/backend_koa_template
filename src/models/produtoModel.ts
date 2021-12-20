import produtoSchema from "../schemas/produtoSchema";
import BaseModel from "../utils/baseModel";

export const produtoModelName = "Produto";

const ProdutoModel = new BaseModel(produtoModelName, produtoSchema);

export default ProdutoModel;
