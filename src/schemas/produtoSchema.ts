import { Schema } from "mongoose";

export interface ProdutoSchema extends Document {
  nome: string;
}

const produtoSchema = new Schema<ProdutoSchema>({
  nome: String,
});

export default produtoSchema;
