import express from 'express';
import {
    createEvaluationController,
    getIdeaEvaluationController,
    getEvaluatorEvaluationController,
    getIdeaEvaluatorEvaluationController,
    getIdeaEvaluatorEvaluationByIdController
} from '../controllers/evaluation.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const evalRouter = express.Router();

/**
 * @swagger
 * /api/evaluations:
 *   post:
 *     summary: Create a new evaluation for an idea
 *     tags: [Evaluations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ideaId:
 *                 type: string
 *                 description: ID of the idea being evaluated
 *                 example: "605c72ef153207d7f123f8ab"
 *               evaluatorId:
 *                 type: string
 *                 description: ID of the evaluator (investor or consultant)
 *                 example: "605c72ef153207d7f123f8ab"
 *               feasibilityScore:
 *                 type: integer
 *                 description: Feasibility score of the idea
 *                 example: 8
 *               marketPotentialScore:
 *                 type: integer
 *                 description: Market potential score of the idea
 *                 example: 7
 *               riskAssessment:
 *                 type: integer
 *                 description: Risk assessment score of the idea
 *                 example: 6
 *               comments:
 *                 type: string
 *                 description: Comments for the evaluation
 *                 example: "The idea has strong market potential but needs further development in the feasibility area."
 *     responses:
 *       201:
 *         description: Evaluation created successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized - Only investors or consultants can evaluate ideas
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/evaluations/{ideaId}:
 *   get:
 *     summary: Get evaluations for a specific idea
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: ideaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved evaluations for the idea
 *       404:
 *         description: Idea not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/evaluations/evaluator/{evaluatorId}:
 *   get:
 *     summary: Get evaluations for a specific evaluator
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: evaluatorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved evaluations by the evaluator
 *       404:
 *         description: Evaluator not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/evaluations/{ideaId}/evaluator/{evaluatorId}:
 *   get:
 *     summary: Get evaluation for a specific idea by a specific evaluator
 *     tags: [Evaluations]
 *     parameters:
 *       - in: path
 *         name: ideaId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: evaluatorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retrieved evaluation for the idea by the evaluator
 *       404:
 *         description: Evaluation not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Evaluation:
 *       type: object
 *       properties:
 *         ideaId:
 *           type: string
 *           description: ID of the idea being evaluated
 *         evaluatorId:
 *           type: string
 *           description: ID of the evaluator (investor or consultant)
 *         feasibilityScore:
 *           type: integer
 *           description: Feasibility score of the idea
 *         marketPotentialScore:
 *           type: integer
 *           description: Market potential score of the idea
 *         riskAssessment:
 *           type: integer
 *           description: Risk assessment score of the idea
 *         comments:
 *           type: string
 *           description: Comments for the evaluation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the evaluation was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the evaluation was last updated
 */

evalRouter .post('/evaluation',authMiddleware, createEvaluationController); 
evalRouter .get('/evaluation/idea/:ideaId',authMiddleware, getIdeaEvaluationController); 
evalRouter .get('/evaluation/evaluator/:evaluatorId',authMiddleware, getEvaluatorEvaluationController); 
evalRouter .get('/evaluation/idea/:ideaId/evaluator/:evaluatorId',authMiddleware, getIdeaEvaluatorEvaluationController); 
evalRouter .get('/evaluation/idea/:ideaId/evaluator/:evaluatorId/:evaluationId',authMiddleware, getIdeaEvaluatorEvaluationByIdController); 

export default evalRouter ;
