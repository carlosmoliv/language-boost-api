import express from "express";
import cors from "cors";

import * as database from "../config/database";

const configureExpress = () => {
  const app: express.Application = express();

  app.use(cors({ origin: "http://localhost:3000" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  return app;
};

export default () => database.connect().then(configureExpress);
