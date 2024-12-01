import express from 'express';
import {
    createEvaluationController,
    getIdeaEvaluationController,
    getEvaluatorEvaluationController,
    getIdeaEvaluatorEvaluationController,
    getIdeaEvaluatorEvaluationByIdController
} from '../controllers/evaluation.controller';

const router = express.Router();

router.post('/evaluation', createEvaluationController); 
router.get('/evaluation/idea/:ideaId', getIdeaEvaluationController); 
router.get('/evaluation/evaluator/:evaluatorId', getEvaluatorEvaluationController); 
router.get('/evaluation/idea/:ideaId/evaluator/:evaluatorId', getIdeaEvaluatorEvaluationController); 
router.get('/evaluation/idea/:ideaId/evaluator/:evaluatorId/:evaluationId', getIdeaEvaluatorEvaluationByIdController); 

export default router;
