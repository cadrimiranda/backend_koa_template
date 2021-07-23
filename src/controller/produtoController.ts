import ProdutoModel from "../models/produtoModel";
import BaseController from "../utils/baseController";

class ProdutoController extends BaseController {
  constructor() {
    super(ProdutoModel);
  }
}

export default ProdutoController;
