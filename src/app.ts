import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { newProductRepo } from "./repo/product";
import { newBookingRepo } from "./repo/booking";

import { newProductService } from "./service/product";
import { newBookingService } from "./service/booking";

import { newV1Router } from "./web/router/v1/index";
import { newProductController } from "./web/controller/product";
import { newBookingController } from "./web/controller/booking";

import { verifyApiKey } from "./web/middleware/verifyApiKey";

import { newLogManager, newLogManagerStreamer } from "./infra/logger";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(verifyApiKey);


(async () => {
    const logger = await newLogManager();
    const requestLogStreamer = await newLogManagerStreamer(logger);

    const productRepo = await newProductRepo();
    const bookingRepo = await newBookingRepo(logger);

    const productService = await newProductService(productRepo);
    const bookingService = await newBookingService(bookingRepo, logger);

    const productController = await newProductController(productService, logger);
    const bookingController = await newBookingController(bookingService, logger);

    const v1Router = await newV1Router(productController, bookingController);

    app.use(morgan("short", { stream: requestLogStreamer }));
    app.use("/api/v1", v1Router);

})();

export default app;

