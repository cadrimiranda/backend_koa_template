/* eslint-disable @typescript-eslint/ban-ts-comment */
import produtoSchema from "../schemas/produtoSchema";
import BaseModel from "./baseModel";

// @ts-ignore
const ProdutoModel = new BaseModel("Produto", produtoSchema);

export default ProdutoModel;
