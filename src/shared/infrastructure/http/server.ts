import "dotenv/config";
import { logger } from "../adapters/logger.utils";
import setupApp from "./app";

const PORT = process.env.PORT || 4000;

setupApp()
  .then((app) =>
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
  )
  .catch((error: Error) => {
    logger.error(error);
    process.exit(1);
  });
