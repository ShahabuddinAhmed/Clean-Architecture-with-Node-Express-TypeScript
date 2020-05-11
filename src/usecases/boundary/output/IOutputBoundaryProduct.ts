import { SearchQuery } from "../../../domain/entity/productEntity";
import { Response } from "express";

export interface IOutputBoundaryProduct {
    listProduct(res: Response, searchQuery: SearchQuery): void;
}