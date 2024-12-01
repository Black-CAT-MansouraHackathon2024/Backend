import dotenv from "dotenv";
dotenv.config();
import config from "config";
import jwt from 'jsonwebtoken';

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export const generateToken = (payload: any) => {
    return jwt.sign(payload, privateKey, {expiresIn: '1h'});
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, publicKey, {algorithms: ['RS256']});
}

export const generateRefreshToken = (payload: any) => {
    return jwt.sign(payload, privateKey, {expiresIn: '7d'});
}
