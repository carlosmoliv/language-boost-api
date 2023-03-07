import "dotenv/config";
import setupApp from "./src/app";
import { logger } from "./src/utils/logger.utils";

const PORT = process.env.PORT || 4000;

setupApp()
  .then((app) =>
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
  )
  .catch((error: Error) => {
    logger.error(error);
    process.exit(1);
  });
