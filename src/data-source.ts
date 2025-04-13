import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Task } from './entity/Task';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true, // для разработки можно включить автоматическую синхронизацию
  logging: false,
  entities: [User, Task],
  migrations: [],
  subscribers: [],
});
