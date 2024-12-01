import express from 'express';
import {
    createEvaluationController,
    getIdeaEvaluationController,
    getEvaluatorEvaluationController,
    getIdeaEvaluatorEvaluationController,
    getIdeaEvaluatorEvaluationByIdController
} from '../controllers/evaluation.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/evaluation',authMiddleware, createEvaluationController); 
router.get('/evaluation/idea/:ideaId',authMiddleware, getIdeaEvaluationController); 
router.get('/evaluation/evaluator/:evaluatorId',authMiddleware, getEvaluatorEvaluationController); 
router.get('/evaluation/idea/:ideaId/evaluator/:evaluatorId',authMiddleware, getIdeaEvaluatorEvaluationController); 
router.get('/evaluation/idea/:ideaId/evaluator/:evaluatorId/:evaluationId',authMiddleware, getIdeaEvaluatorEvaluationByIdController); 

export default router;
