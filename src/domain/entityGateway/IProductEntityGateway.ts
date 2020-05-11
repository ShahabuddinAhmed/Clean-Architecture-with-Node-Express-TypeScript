import { SearchQuery } from "../entity/productEntity";
export interface IProductEntityGateway {
    listProduct(searchQuery: SearchQuery): Promise<any>;
}