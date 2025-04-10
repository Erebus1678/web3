import { Router, Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const newUser: IUser = new User({ name, email });
    console.log(newUser);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.query;
    const users = await User.find(params);
    if (users.length < 1) {
      res.status(404).json({ error: 'Пользователь с такими параметрами не найден' });
      return
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/all', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ error: 'Пользователь не найден' });
      return
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
