import { Request, Response, NextFunction } from 'express';
import {
    giveEvaluation,
    getIdeaEvaluation,
    getEvaluatorEvaluation,
    getIdeaEvaluatorEvaluation,
    getIdeaEvaluatorEvaluationById,
} from '../services/evaluation.services';
import { getUserIdea } from '../services/idea.services';


export const createEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user= req.body.user;
        if(user.role !== 'investor' || user.role !== 'consultant'){ 
            throw new Error('Unauthorized');
        }
        const evaluatedData = giveEvaluation(req.body);
        res.status(201).send(evaluatedData);
    }
    catch(err){
       next(err);
    }
};

export const getIdeaEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.body.user;
        const userIdea= getUserIdea(user._id);
        if(user.role !== 'investor' || user.role !== 'consultant'){
            throw new Error('Unauthorized');
        }
        if(userIdea !==user._id){
            throw new Error('Unauthorized');
        }
        const evaluationId = req.params.id;
        const ideaEvaluation = getIdeaEvaluation(evaluationId);
        res.status(200).send(ideaEvaluation);

    }catch(err:any){
        next(err);
    }
};


export const getEvaluatorEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const evaluatorId = req.params.id;
        const userId = req.body.user._id;
        if(evaluatorId !== userId){
            throw new Error('Unauthorized');
        }
        const evaluatorEvaluation = getEvaluatorEvaluation(evaluatorId);
        res.status(200).send(evaluatorEvaluation);
    }catch(err:any){
        next(err);
    }
    
};

export const getIdeaEvaluatorEvaluationController = async (req: Request, res: Response, next: NextFunction) => {//idea owner ,investors or consultants
    try{
        const user = req.body.user;
        const userIdea= getUserIdea(user._id);
        if(userIdea !==user._id){
            throw new Error('Unauthorized');
        }
        if(user.role !== 'investor' || user.role !== 'consultant'){
            throw new Error('Unauthorized');
        }
        const ideaId = req.params.ideaId;
        const evaluatorId = req.params.evaluatorId;
        const ideaEvaluatorEvaluation = getIdeaEvaluatorEvaluation(ideaId, evaluatorId);
        res.status(200).send(ideaEvaluatorEvaluation);
    }catch(err:any){
        next(err);
    }
};


export const getIdeaEvaluatorEvaluationByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.body.user;
        const userIdea= getUserIdea(user._id);
        if(userIdea !==user._id){
            throw new Error('Unauthorized');
        }
        if(user.role !== 'investor' || user.role !== 'consultant'){
            throw new Error('Unauthorized');
        }
        const ideaId = req.params.ideaId;
        const evaluatorId = req.params.evaluatorId;
        const evaluationId = req.params.id;
        const ideaEvaluatorEvaluation = getIdeaEvaluatorEvaluationById(ideaId, evaluatorId, evaluationId);
        res.status(200).send(ideaEvaluatorEvaluation);
    }catch(err:any){
        next(err);
    }
};
