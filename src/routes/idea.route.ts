import {Router} from 'express';
import * as ideaController from '../controllers/idea.controller';
import {authMiddleware} from '../middlewares/auth.middleware';

const ideaRouter = Router();
/**
 * @swagger
 * /api/ideas/create:
 *   post:
 *     summary: Create a new idea
 *     tags: [Ideas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Idea'
 *     responses:
 *       201:
 *         description: Idea created successfully
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/ideas/{id}:
 *   get:
 *     summary: Get an idea by ID
 *     tags: [Ideas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Idea retrieved successfully
 *       404:
 *         description: Idea not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/ideas/{id}/resources:
 *   post:
 *     summary: Add resources to an idea
 *     tags: [Ideas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resources:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Resources added successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/ideas/{id}:
 *   put:
 *     summary: Update an idea by ID
 *     tags: [Ideas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Idea'
 *     responses:
 *       200:
 *         description: Idea updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Idea not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/ideas/{id}:
 *   delete:
 *     summary: Delete an idea by ID
 *     tags: [Ideas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Idea deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Idea not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/ideas:
 *   get:
 *     summary: Get all ideas
 *     tags: [Ideas]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Technology, Agriculture, Health, Industry, Economy, Community Service, Education, Energy]
 *         description: Filter ideas by category
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, submitted, funded]
 *         description: Filter ideas by status
 *     responses:
 *       200:
 *         description: Ideas retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Idea:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the idea
 *         description:
 *           type: string
 *           description: A brief description of the idea
 *         category:
 *           type: string
 *           enum: [Technology, Agriculture, Health, Industry, Economy, Community Service, Education, Energy]
 *           description: The category of the idea
 *         status:
 *           type: string
 *           enum: [draft, submitted, funded]
 *           description: The status of the idea
 *         resourcesRequired:
 *           type: array
 *           items:
 *             type: string
 *           description: The resources required for the idea
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the idea
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the idea
 *         creatorId:
 *           type: string
 *           description: The ID of the user who created the idea
 */


ideaRouter .post('/create', authMiddleware,ideaController.createIdea);
ideaRouter .get('/get',authMiddleware, ideaController.getIdeas);
ideaRouter .get('/get/:id',authMiddleware, ideaController.getIdea);
ideaRouter .put('/update/:id',authMiddleware, ideaController.updateIdea);
ideaRouter .delete('/delete/:id',authMiddleware, ideaController.deleteIdea);

export default ideaRouter ;

