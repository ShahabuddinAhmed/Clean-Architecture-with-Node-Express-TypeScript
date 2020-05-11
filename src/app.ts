import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { newProductEntityGateway } from "./infrastructure/index";

import { newV1Router } from "./delivery/router/v1/index";
import { newProductController } from "./delivery/controller/index";



import { newLogManager, newLogManagerStreamer } from "./domain/infra/logger/logger";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


(async () => {
    const logger = await newLogManager();
    const requestLogStreamer = await newLogManagerStreamer(logger);

    const productEntityGateway = await newProductEntityGateway();

    const productInteractor = await newProductService(productEntityGateway);

    const productController = await newProductController(productInteractor);

    const v1Router = await newV1Router(productController);

    app.use(morgan("short", { stream: requestLogStreamer }));
    app.use("/api/v1", v1Router);

})();

export default app;

