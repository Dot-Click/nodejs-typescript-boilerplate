import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ApiError from "./utils/ApiError";
import router from "./router";
import loggerMiddleware from "./middleware/loggerMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger_output.json"; // Generated Swagger file

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMiddleware);

// router index
app.use("/", router);

// api doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req: Request, res: Response) => {
  res.send("Time2Cleann v1.1");
});

// send back a 404 error for any unknown api request
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(404, "Not found"));
});

export default app;
