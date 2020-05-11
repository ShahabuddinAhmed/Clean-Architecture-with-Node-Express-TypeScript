import { Router } from "express";
import { newHealthRouter } from "./health";
import { ProductController } from "../../controller/productController";


export const newV1Router = async (productController: ProductController): Promise<Router> => {
    const v1 = Router();
    v1.use("/health", await newHealthRouter());

    v1.use("*", (_req, res) => {
        res.status(404).send({
            code: "PAGE_NOT_FOUND",
            message: "please be sane and hit correct endpoints",
            response: null,
            error: null
        });
    });

    return v1;
};
