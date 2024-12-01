import { Request, Response, NextFunction } from 'express';
import {
    giveEvaluation,
    getIdeaEvaluation,
    getEvaluatorEvaluation,
    getIdeaEvaluatorEvaluation,
    getIdeaEvaluatorEvaluationById,
} from '../services/evaluation.services';

// Controller to handle giving a new evaluation
export const createEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const evaluationData = req.body;
        const newEvaluation = await giveEvaluation(evaluationData);
        return res.status(201).json({
            message: 'Evaluation created successfully',
            data: newEvaluation,
        });
    } catch (err: any) {
        next(err);
    }
};

// Controller to get evaluations for a specific idea
export const getIdeaEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ideaId } = req.params;
        const evaluations = await getIdeaEvaluation(ideaId);
        return res.status(200).json({
            message: 'Evaluations retrieved successfully',
            data: evaluations,
        });
    } catch (err: any) {
        next(err);
    }
};

// Controller to get evaluations by a specific evaluator
export const getEvaluatorEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { evaluatorId } = req.params;
        const evaluations = await getEvaluatorEvaluation(evaluatorId);
        return res.status(200).json({
            message: 'Evaluations retrieved successfully',
            data: evaluations,
        });
    } catch (err: any) {
        next(err);
    }
};

// Controller to get evaluations for a specific idea by a specific evaluator
export const getIdeaEvaluatorEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ideaId, evaluatorId } = req.params;
        const evaluations = await getIdeaEvaluatorEvaluation(ideaId, evaluatorId);
        return res.status(200).json({
            message: 'Evaluations retrieved successfully',
            data: evaluations,
        });
    } catch (err: any) {
        next(err);
    }
};

// Controller to get a specific evaluation by its ID for a given idea and evaluator
export const getIdeaEvaluatorEvaluationByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ideaId, evaluatorId, evaluationId } = req.params;
        const evaluation = await getIdeaEvaluatorEvaluationById(ideaId, evaluatorId, evaluationId);
        if (!evaluation) {
            return res.status(404).json({
                message: 'Evaluation not found',
            });
        }
        return res.status(200).json({
            message: 'Evaluation retrieved successfully',
            data: evaluation,
        });
    } catch (err: any) {
        next(err);
    }
};
