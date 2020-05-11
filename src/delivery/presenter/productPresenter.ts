import { IOutputBoundaryProduct } from "../../usecases/boundary/output/IOutputBoundaryProduct";
import { ProductController } from "../controller/productController";
import { Response } from "express";
import { SearchQuery } from "../../domain/entity/productEntity";

export class ProductPresenter implements IOutputBoundaryProduct {
    private product: ProductController;
    public constructor(product: ProductController) {
        this.product = product;
    }

    public async listProduct(res: Response, data: SearchQuery): Promise<any> {

    }
}