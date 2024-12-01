import {IEvaluation} from '../models/evaluation.model';
import {Evaluation} from '../models/evaluation.model';
import { EvaluationSchema } from '../schemas/evaluation.schema';

export const giveEvaluation = async (data: IEvaluation) => {
    try {
        const evaluation = EvaluationSchema.parse(data);
        if(!evaluation) {
            throw new Error('Invalid data');
        }
        const newEvaluation = await Evaluation.create(evaluation);
        return newEvaluation;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export const getIdeaEvaluation = async (ideaId: string) => {
    try {
        const evaluations = await Evaluation.find({ ideaId });
        return evaluations;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export const getEvaluatorEvaluation = async (evaluatorId: string) => {
    try {
        const evaluations = await Evaluation.find({ evaluatorId });
        return evaluations;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export const getIdeaEvaluatorEvaluation = async (ideaId: string, evaluatorId: string) => {
    try {
        const evaluations = await Evaluation.find({ ideaId, evaluatorId });
        return evaluations;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export const getIdeaEvaluatorEvaluationById = async (ideaId: string, evaluatorId: string, evaluationId: string) => {
    try {
        const evaluation = await Evaluation.findOne({ ideaId, evaluatorId, _id: evaluationId });
        return evaluation;
    } catch (err: any) {
        throw new Error(err.message);
    }
}
