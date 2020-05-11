import { BaseController } from "./baseController";
import { ProductInteractor } from "../../usecases/interactor/productInteractor";
import { IOutputBoundaryProduct } from "../../usecases/boundary/output/IOutputBoundaryProduct";
import { SearchQuery } from "../../domain/entity/productEntity";
import { Request, Response } from "express";

export class ProductController extends BaseController {
    private interactor: ProductInteractor;
    private presenter: IOutputBoundaryProduct;

    public constructor(interactor: ProductInteractor, presenter: IOutputBoundaryProduct) {
        super();
        this.interactor = interactor;
        this.presenter = presenter;
    }

    public async executeImpl(req: Request, res: Response): Promise<any> {
        try {
            const userRewardOrError = await this.interactor.listProduct(req.query as unknown as SearchQuery);
            if (userRewardOrError.didFailed) {
                return this.fail(res, this.presenter.listProduct(res, userRewardOrError.getError()));
            }

            this.ok(res, this.presenter.listProduct(res, userRewardOrError));
        } catch (err) {
            console.log(err);
            this.fail(res, "Sorry Shit happened");
        }

    }
    
}