import { Request, Response, NextFunction } from 'express';
import * as prototypeServices from '../services/prototype.services';
import { prototypeType } from '../schemas/prototype.schema';
import { createPrototypeSchema } from '../schemas/prototype.schema';
import { get } from 'http';
import { getUserIdea } from '../services/idea.services';

export const createPrototypeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prototype = req.body as prototypeType;
        const user = req.body.user;
        const userIdea= await getUserIdea(prototype.ideaId);
        if(userIdea.toString() !==user._id.toString()){
            throw new Error('Unauthorized');
        }
        const result = await createPrototypeSchema.parse(prototype);
        if (!result) {
            throw new Error('Invalid input');
        }
        const newPrototype = await prototypeServices.createPrototype(prototype);
        res.status(201).json(newPrototype);
    } catch (err: any) {
        next(err);
    }

}

export const getPrototypesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prototypes = await prototypeServices.getPrototypes();
        res.status(200).json(prototypes);
    } catch (err: any) {
        next(err);
    }

}

export const getPrototypeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const prototype = await prototypeServices.getPrototype(id);
        res.status(200).json(prototype);
    } catch (err: any) {
        next(err);
    }

}

export const getPrototypesByIdeaController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ideaId = req.params.id;
        const prototypes = await prototypeServices.getPrototypesByIdea(ideaId);
        res.status(200).json(prototypes);
    } catch (err: any) {
        next(err);
    }

}

export const getPrototypeByDeveloperController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const developerId = req.params.id;
        const prototypes = await prototypeServices.getProtypeByDeveloper(developerId);
        res.status(200).json(prototypes);
    } catch (err: any) {
        next(err);
    }
}



