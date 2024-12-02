import { Request, Response, NextFunction } from 'express';
import {
    giveEvaluation,
    getIdeaEvaluation,
    getEvaluatorEvaluation,
    getIdeaEvaluatorEvaluation,
    getIdeaEvaluatorEvaluationById,
} from '../services/evaluation.services';
import { getUserIdea } from '../services/idea.services';
import dotenv from 'dotenv';
import { dot } from 'node:test/reporters';
dotenv.config();


export const createEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user= req.body.user;
        if(user.role !== 'investor'){ 
            throw new Error('Unauthorized');
        }
        const evaluatedData = await giveEvaluation(req.body);
        res.status(201).send(evaluatedData);
    }
    catch(err){
       next(err);
    }
};

export const getIdeaEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.body.user;
        console.log(req.params.id);
        const userIdea= await getUserIdea(req.params.ideaId);
        console.log(userIdea.toString());
        console.log(user._id.toString());

        if(user.role !== 'investor' ){
            throw new Error('Unauthorized');
        }
        if(userIdea.toString() !==user._id.toString()){
            throw new Error('Unauthorized');
        }
        const ideaEvaluation = await getIdeaEvaluation(req.params.ideaId);
        res.status(200).send(ideaEvaluation);

    }catch(err:any){
        next(err);
    }
};


export const getEvaluatorEvaluationController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const evaluatorId = req.params.evaluatorId;
        const userId = req.body.user._id;
        if(evaluatorId.toString() !== userId.toString()){
            throw new Error('Unauthorized');
        }
        const evaluatorEvaluation = await getEvaluatorEvaluation(evaluatorId);
        res.status(200).send(evaluatorEvaluation);
    }catch(err:any){
        next(err);
    }
    
};

export const getIdeaEvaluatorEvaluationController = async (req: Request, res: Response, next: NextFunction) => {//idea owner ,investors or consultants
    try{
        const user = req.body.user;
        const userIdea= await getUserIdea(req.params.ideaId);
        
        if(userIdea.toString() !==user._id.toString()){
            throw new Error('Unauthorized');
        }
        if(user.role !== 'investor' ){
            throw new Error('Unauthorized');
        }
        const ideaId = req.params.ideaId;
        const evaluatorId = req.params.evaluatorId;
        const ideaEvaluatorEvaluation = await getIdeaEvaluatorEvaluation(ideaId, evaluatorId);
        res.status(200).send(ideaEvaluatorEvaluation);
    }catch(err:any){
        next(err);
    }
};


export const getIdeaEvaluatorEvaluationByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.body.user;
        const userIdea= await getUserIdea(req.params.ideaId);
        if(userIdea.toString() !==user._id.toString()){
            throw new Error('Unauthorized');
        }
        if(user.role !== 'investor'){
            throw new Error('Unauthorized');
        }
        const ideaId = req.params.ideaId;
        const evaluatorId = req.params.evaluatorId;
        const evaluationId = req.params.evaluationId;
        const ideaEvaluatorEvaluation = await getIdeaEvaluatorEvaluationById(ideaId, evaluatorId, evaluationId);
        res.status(200).send(ideaEvaluatorEvaluation);
    }catch(err:any){
        next(err);
    }
};
