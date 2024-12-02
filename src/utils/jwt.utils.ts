import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import config from "config";

const publicKey :string= config.get("publicKey");
const privateKey : string= config.get("privateKey");

export const generateToken=(userId: string)=>
{  return jwt.sign({ user: { id: userId } }, privateKey, { algorithm: 'RS256', expiresIn: process.env.ACCESS_KEY_TTL});
}

export const generateRefreshToken=(userId: string)=>{
    return jwt.sign({ user: { id: userId } }, privateKey, { algorithm: 'RS256', expiresIn: process.env.REFRESH_KEY_TTL});
}

export const verifyToken=(token: string)=>{
    try{
    return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    }
    catch(error){
        throw new Error('Invalid token');
    }
}
