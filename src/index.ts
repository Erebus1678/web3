import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './data-source';
import { User } from './entity/User';
import { Task } from './entity/Task';

const app = express();
const port = 3000;

app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

AppDataSource.initialize()
  .then(() => console.log('Connected to SQLite via TypeORM'))
  .catch(err => console.error('Error during Data Source initialization', err));


app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ id: Number(id) })
    if (!user) {
      res.status(404).json({ error: "No user" })
      return
    }
    res.json(user)
  } catch (error) {
    next(error)
  }
})

app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create({ name, email });
    await userRepository.save(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

app.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const {email, name} = req.body
    const userRepository = AppDataSource.getRepository(User)
    const user:User|null = await userRepository.findOne({
      where: {
        id: Number(id)
      }
    })

    if (!user) {
      res.status(404).json({ error: 'Пользователь не найден' });
    return
    }
    

    if (email) {
      user.email = email
    }
    if (name) {
      user.name = name
    }

    await userRepository.save(user)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})


app.delete('/users/:id', async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    const { id } = req.params;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.delete(id);
    if (user.affected === 0) {
      res.status(404).json({ error: 'There is no user' });
      return;
    }
    res.status(200).json({ message: 'User Deleted' });
  } catch (error) {
    next(error);
  }
});


app.get('/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

app.post('/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, complete } = req.body;
    const taskRepository = AppDataSource.getRepository(Task);
    const task = taskRepository.create({ name, complete });
    await taskRepository.save(task);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(port)