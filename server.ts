import "dotenv/config";
import setupApp from "./src/app";

const PORT = process.env.PORT || 4000;

setupApp()
  .then((app) =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error: Error) => {
    console.log(error);
    process.exit(1);
  });
