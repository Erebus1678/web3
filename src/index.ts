import "reflect-metadata";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/tasksRoutes";
import usersRoutes from "./routes/usersRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

AppDataSource.initialize()
  .then((): void => console.log("Connected to SQLite via TypeORM"))
  .catch((err: Error): void =>
    console.error("Error during Data Source initialization", err),
  );

app.use("/tasks", taskRoutes);

app.use("/users", usersRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(port);
