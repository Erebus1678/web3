import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { AppDataSource } from "../data-source";
import { body, param, validationResult } from "express-validator";
import { User } from "../entity/User";

const router = Router();
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

router.get(
  "/:id",
  [param("id").notEmpty().isNumeric().withMessage("id is req")],
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: Number(id) });
      if (!user) {
        res.status(404).json({ error: "No user" });
        return;
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  [
    body("name").notEmpty().isString().withMessage("Name is req"),
    body("email").notEmpty().isString().withMessage('Field "email" is req'),
  ],
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const newUser = userRepository.create({ name, email });
      await userRepository.save(newUser);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  [
    param("id").notEmpty().isNumeric().withMessage("id is req"),
    body("name").notEmpty().isString().withMessage("Name is req"),
    body("email").notEmpty().isString().withMessage('Field "email" is req'),
  ],
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { email, name } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const user: User | null = await userRepository.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        res.status(404).json({ error: "Пользователь не найден" });
        return;
      }

      if (email) {
        user.email = email;
      }
      if (name) {
        user.name = name;
      }

      await userRepository.save(user);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  [param("id").notEmpty().isNumeric().withMessage("id is req")],
  validate,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.delete(id);
      if (user.affected === 0) {
        res.status(404).json({ error: "There is no user" });
        return;
      }
      res.status(200).json({ message: "User Deleted" });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
