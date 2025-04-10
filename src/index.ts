import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json())

app.use((req: Request, res: Response, next: Function) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get('/about', (req: Request, res: Response) => {
  res.send('Это учебное приложение Web3 на базе Express + TypeScript.');
});

app.post('/users', (req: Request, res: Response) => {
  const newUser = req.body;
  // Здесь можно добавить проверку данных, по желанию.
  res.status(201).json({ message: 'Пользователь создан', user: newUser });
});

app.get('/users/:id', (req: Request, res: Response) => {
  res.send({
    params: req.params,
    query:req.query
  })
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error('Ошибка:', err);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});