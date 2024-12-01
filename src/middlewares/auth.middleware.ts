import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import { getUser } from '../services/user.services';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1];
        if (!accessToken) {
            return res.status(401).send({ message: 'Access token not found' });
        }
        const decoded = verifyToken(accessToken) as {
            [x: string]: any; userId: string
        };
        const userId: string = decoded.user.id as string;
        const user = await getUser(userId);
        console.log(user);
        if (!user) {
            return res.status(401).send({ message: 'User not found' });
        }
        req.body.user = user
        next();
    }
    catch (err) {
        next(err);
    }
};
