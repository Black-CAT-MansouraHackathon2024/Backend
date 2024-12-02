import { createPrototypeController,getPrototypeByDeveloperController,getPrototypeController,getPrototypesByIdeaController,getPrototypesController
 } from "../controllers/prototype.controller,";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";


const prototypeRouter = Router();
/**
 * @swagger
 * tags:
 *   name: Prototypes
 *   description: API endpoints for managing prototypes
 */

/**
 * @swagger
 * /api/prototypes/create:
 *   post:
 *     summary: Create a new prototype
 *     tags: [Prototypes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PrototypeInput'
 *     responses:
 *       201:
 *         description: Created prototype successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prototype'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/prototypes/getPrototypes:
 *   get:
 *     summary: Get all prototypes
 *     tags: [Prototypes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all prototypes successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prototype'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/prototypes/getPrototype/{id}:
 *   get:
 *     summary: Get a prototype by ID
 *     tags: [Prototypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Prototype ID
 *     responses:
 *       200:
 *         description: Get prototype successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prototype'
 *       404:
 *         description: Prototype not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/prototypes/getPrototypesByIdea/{id}:
 *   get:
 *     summary: Get all prototypes for a specific idea
 *     tags: [Prototypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Idea ID
 *     responses:
 *       200:
 *         description: Get prototypes successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prototype'
 *       404:
 *         description: Prototypes not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/prototypes/getPrototypeByDeveloper/{id}:
 *   get:
 *     summary: Get prototypes by developer ID
 *     tags: [Prototypes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Developer ID
 *     responses:
 *       200:
 *         description: Get prototypes successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prototype'
 *       404:
 *         description: Prototypes not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PrototypeInput:
 *       type: object
 *       required:
 *         - ideaId
 *         - prototypeUrl
 *         - status
 *         - developerId
 *       properties:
 *         ideaId:
 *           type: string
 *           description: ID of the idea
 *         prototypeUrl:
 *           type: string
 *           description: URL of the prototype
 *         status:
 *           type: string
 *           enum: [in progress, completed]
 *           description: Current status of the prototype
 *         developerId:
 *           type: string
 *           description: ID of the developer
 *     Prototype:
 *       allOf:
 *         - $ref: '#/components/schemas/PrototypeInput'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: Unique identifier for the prototype
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: Creation timestamp
 */


prototypeRouter.post('/create',authMiddleware, createPrototypeController);
prototypeRouter.get('/getPrototypes',authMiddleware, getPrototypesController);
prototypeRouter.get('/getPrototype/:id',authMiddleware, getPrototypeController);
prototypeRouter.get('/getPrototypesByIdea/:id',authMiddleware, getPrototypesByIdeaController);
prototypeRouter.get('/getPrototypeByDeveloper/:id',authMiddleware, getPrototypeByDeveloperController);

export default prototypeRouter;