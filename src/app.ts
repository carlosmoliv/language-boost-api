import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import api from "./routes";
import * as database from "../config/database";
import { AppError } from "../utils/errors.utils";
import { expressLogger } from "../utils/logger.utils";

const configureExpress = () => {
  const app: express.Application = express();

  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(expressLogger);

  app.use("/v1", api);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError)
      return res
        .status(err.statusCode)
        .json({ status: "error", name: err.name, message: err.message });

    return res.status(500).json({
      status: "error",
      name: "InternalServerError",
      message: `Looks like something went wrong - ${err.message}`,
    });
  });

  return app;
};

export default () => database.connect().then(configureExpress);
