import express from "express";
import cors from "cors";

import * as database from "../config/database";
import api from "./routes";
import { expressLogger } from "../utils/logger.utils";

const configureExpress = () => {
  const app: express.Application = express();

  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(expressLogger);

  app.use("/v1", api);

  return app;
};

export default () => database.connect().then(configureExpress);
