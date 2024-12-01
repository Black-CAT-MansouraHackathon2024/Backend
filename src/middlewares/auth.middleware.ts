import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import { getUser } from '../services/user.services';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization?.split(' ');
        if (!authorization || authorization[0] !== 'Bearer' || !
            authorization[1]) {
            throw new Error('UNAUTHORIZED');
        }
        const token = authorization[1];
        const decoded = verifyToken(token);
        let user;
        if (typeof decoded !== 'string' && 'id' in decoded) {
            user = await getUser(decoded.id);
        } else {
          throw new Error('UNAUTHORIZED');
        }
         
        req.body.user = user;
        next();
    }
    catch (error:any) {
       next(error);
    }
};
