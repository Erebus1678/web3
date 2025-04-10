import express, { Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import 'dotenv/config';
import userRoutes from './routes/UserRoutes'

const app = express();
const port = 3000;
const mongoDB: string = process.env.MONGO_DB_CONNECTION_STR || '';

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/users', userRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Ошибка:', err);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
