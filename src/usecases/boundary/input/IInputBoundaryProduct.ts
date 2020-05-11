import { SearchQuery } from "../../../domain/entity/productEntity";

export interface IInputBoundaryProduct {
    listProduct(searchQuery: SearchQuery): void;
}