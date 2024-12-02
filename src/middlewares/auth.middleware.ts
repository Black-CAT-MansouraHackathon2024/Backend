import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import { getUser } from '../services/user.services';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token= req.headers.authorization?.split(' ')[1];
        if(!token){
            throw new Error('Unauthorized');
        }
        const decoded = verifyToken(token) as {
            [x: string]: any; user: any;
        };
        console.log("ll",decoded);
        const userRecord = await getUser(decoded.user.id as string);
        if(!userRecord){
            throw new Error('Unauthorized');
        }
        req.body.user = userRecord;
        next();
    }
    catch(err){
        next(err);
    }
};
