import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { body, validationResult } from "express-validator";

import { AppDataSource } from "../data-source";
import { Task } from "../entity/Task";

const router = Router();

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is req"),
    body("complete")
      .optional()
      .isBoolean()
      .withMessage('Field "complete" have to be a boolean'),
  ],
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, complete } = req.body;
      const taskRepository = AppDataSource.getRepository(Task);
      const task = taskRepository.create({ name, complete });
      await taskRepository.save(task);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
