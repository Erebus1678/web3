import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Task } from './entity/Task';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true, // ok for local but not for prod
  logging: false,
  entities: [User, Task],
  migrations: [],
  subscribers: [],
});
