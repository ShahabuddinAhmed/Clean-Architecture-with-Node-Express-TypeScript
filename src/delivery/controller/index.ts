import { ProductController } from "./productController";
import { BookingController } from "./bookingController";
import { ProductInteractor } from "../../usecases/interactor/productInteractor";
import { IOutputBoundaryProduct } from "../../usecases/boundary/output/IOutputBoundaryProduct";

export const newProductController = (interactor: ProductInteractor, iOutputBoundaryProduct: IOutputBoundaryProduct): ProductController => {
    return new ProductController(interactor, iOutputBoundaryProduct);
};