import DB from "../db";
import produtoSchema, { ProdutoSchema } from "../schemas/produtoSchema";

const ProdutoModel = DB.getInstance().createModel<ProdutoSchema>(
  "Produto",
  produtoSchema
);

export default ProdutoModel;
