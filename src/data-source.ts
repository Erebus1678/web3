import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Task } from "./entity/Task";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.NODE_ENV === "test" ? ":memory:" : "database.sqlite",
  synchronize: true, // ok for local but not for prod
  logging: false,
  entities: [User, Task],
  migrations: [],
  subscribers: [],
});
