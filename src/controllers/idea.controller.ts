import {Request,Response,NextFunction} from 'express';
import * as ideaServices from '../services/idea.services';
import { ideaSchema } from '../schemas/idea.schema';
import { getUserIdea } from '../services/idea.services';
import { ParsedQs } from 'qs';

export const createIdea = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const validatedData = ideaSchema.parse(req.body);
       if(!validatedData) {
           throw new Error('Invalid data');
       }
         const newIdea = await ideaServices.createIdea(validatedData);
          res.status(201).send(newIdea);
    } catch (err: any) {
        next(err);
    }
}

export const getIdea = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idea = await ideaServices.getIdea(req.params.id);
        res.send(idea);
    } catch (err: any) {
        next(err);
    }
}

export const addResources = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body.user;
        const userIdea= getUserIdea(req.params.id);
        if(userIdea !==user._id){
            throw new Error('Unauthorized');
        }
        const idea = await ideaServices.addResources(req.params.id, req.body.resources);
        res.status(200).send(idea);
    } catch (err: any) {
        next(err);
    }
}

export const updateIdea = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body.user;
        const userIdea=await  getUserIdea(req.params.id);
        console.log(userIdea);
        console.log(user._id);
        if(userIdea.toString() !==user._id.toString()){
            throw new Error('Unauthorized');
        }

        const validatedData = ideaSchema.parse(req.body);
        if (!validatedData) {
            throw new Error('Invalid data');
        }
        const updatedIdea = await ideaServices.updateIdea(req.params.id, validatedData);
        res.status(200).send(updatedIdea);
    } catch (err: any) {
        next(err);
    }
}


export const deleteIdea = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body.user;
        const userIdea= await getUserIdea(req.params.id);
        console.log(user);
        console.log(userIdea);
        if(userIdea.toString() !==user._id.toString()){
            throw new Error('Unauthorized');
        }
        const idea = await ideaServices.deleteIdea(req.params.id);
        res.status(200).send(idea);
    } catch (err: any) {
        next(err);
    }
}

export const getIdeas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let queyString = req.query;
        const ideas = await ideaServices.getIdeas(queyString);
        res.status(200).json(ideas);
    } catch (err: any) {
        next(err);
    }
}
