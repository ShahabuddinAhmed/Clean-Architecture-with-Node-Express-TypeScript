import { SearchQuery } from "../../domain/entity/productEntity";
import { IProductEntityGateway } from "../../domain/entityGateway/IProductEntityGateway";
import { IInputBoundaryProduct } from "../../usecases/boundary/input/IInputBoundaryProduct";

export class ProductInteractor implements IInputBoundaryProduct {
    productEntityGateway: IProductEntityGateway;

    public constructor(productEntityGateway: IProductEntityGateway) {
        this.productEntityGateway = productEntityGateway;
    }

    async listProduct(searchQuery: SearchQuery): Promise<any> {
        return this.productEntityGateway.listProduct(searchQuery);
    }
    
}