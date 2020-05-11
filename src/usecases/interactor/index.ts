import { ProductInteractor } from "./productInteractor";

export const newProductInteractor = (interactor: ProductInteractor): ProductInteractor => {
    return new ProductInteractor(interactor);
};