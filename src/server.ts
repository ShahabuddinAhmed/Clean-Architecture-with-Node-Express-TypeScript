import app from "./app";
import http from "http";
import config from "./config/config";
import newSequelize from "./infra/sequelize";

const logger = console;

const gracefulShutdown = (server: http.Server, forcedTimeout: number) => {
    return function () {
        logger.info("Received SIGINT or SIGTERM. Shutting down gracefully...");
        server.close(() => {
            logger.info("Closed out remaining connections.");

            newSequelize().close()
            .then(() => {
                console.log("Database connection closed.");
                process.exit();
            }).catch(() => {
                process.exit();
            })
        });
        
        setTimeout(() => {
            logger.error("Could not close connections in time, forcefully shutting down");
            process.exit();
        }, forcedTimeout);
    };
};


const server = http.createServer(app);

process.on("SIGTERM", gracefulShutdown(server, config.APP_FORCE_SHUTDOWN_SECOND));
process.on("SIGINT", gracefulShutdown(server, config.APP_FORCE_SHUTDOWN_SECOND));

newSequelize().authenticate()
.then(() => {
    server.listen(config.APPLICATION_SERVER_PORT, () => {
        logger.log("Clean Architecture API IS RUNNING: " + config.APPLICATION_SERVER_PORT);
    });
    console.log("Connection has been Established Successfully.");
})
.catch((err: any) => {
    console.error("Unable to connect to the database:", err);
})
