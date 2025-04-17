import "reflect-metadata";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

import taskRoutes from "./routes/tasksRoutes";
import userRoutes from "./routes/usersRoutes";

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} – ${req.method} ${req.url}`);
  next();
});

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true }),
);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Ошибка:", err);
  res.status(500).json({ error: "Что-то пошло не так!" });
});

export default app;
