import app from "./app";
import { AppDataSource } from "./data-source";

const port = process.env.PORT ?? 3000;

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Connected to SQLite via TypeORM");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

startServer();