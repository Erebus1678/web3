/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the task
 *         name:
 *           type: string
 *           description: The name of the task
 *         complete:
 *           type: boolean
 *           description: The completion status of the task
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when task was created
 *       example:
 *         id: 1
 *         name: Complete project documentation
 *         complete: false
 *         createdAt: 2025-04-17T12:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: The tasks management API
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 * 
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the task
 *               complete:
 *                 type: boolean
 *                 description: The completion status of the task
 *                 default: false
 *     responses:
 *       201:
 *         description: The created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 */