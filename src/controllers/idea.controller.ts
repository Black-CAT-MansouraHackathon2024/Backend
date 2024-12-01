import {Request,Response,NextFunction} from 'express';
import * as ideaServices from '../services/idea.services';
import { ideaSchema } from '../schemas/idea.schema';

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
        const idea = await ideaServices.addResources(req.params.id, req.body.resources);
        res.status(200).send(idea);
    } catch (err: any) {
        next(err);
    }
}

export const updateIdea = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        const idea = await ideaServices.deleteIdea(req.params.id);
        res.status(200).send(idea);
    } catch (err: any) {
        next(err);
    }
}

export const getIdeas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ideas = await ideaServices.getAllIdeas();
        res.send(ideas);
    } catch (err: any) {
        next(err);
    }
}

export const getIdeasByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ideas = await ideaServices.getIdeasByCategory(req.params.category);
        res.send(ideas);
    } catch (err: any) {
        next(err);
    }
}

export const getIdeasByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ideas = await ideaServices.getIdeasByStatus(req.params.status);
        res.send(ideas);
    } catch (err: any) {
        next(err);
    }
}

export const getIdeasByCreator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ideas = await ideaServices.getIdeasByCreator(req.params.creatorId);
        res.send(ideas);
    } catch (err: any) {
        next(err);
    }
}
