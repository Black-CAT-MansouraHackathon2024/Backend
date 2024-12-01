import { NextFunction, Request, Response } from 'express';
import { createUser, getUserByEmail, getUser, updateUser } from '../services/user.services';
import { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import { generateEmailToken, verifyEmailToken, sendEmail } from '../utils/email.utils';
import { createUserSchema } from '../schemas/user.schema';
import { generateToken, generateRefreshToken, verifyToken } from '../utils/jwt.utils';
import { profile } from 'console';


export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user ={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            role:req.body.role ||'innovator',
            bio:req.body.bio||'',
            profilePic:req.body.profilePicture||'',
            isEmailVerified:false,
            refreshToken:'',
            skills:req.body.skills||[],
        };
        const result = await createUser(user);
        res.status(201).json(result);
    }catch(err:any){
      next(err);
    }
};

export const confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const emailToken = req.params.token;
        const email = verifyEmailToken(emailToken);
        if(typeof email !== 'string'){
            throw new Error('Invalid token');
        }
        const user = await getUserByEmail(email);
        if(user){
            user.isEmailVerified = true;
            user.emailToken = '';
            await user.save();
            res.status(200).json({message:'Email verified successfully'});
        }else{
            throw new Error('User not found');
        }
    }catch(err:any){
        next(err);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await getUserByEmail(email);
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const userId = (user._id as string).toString();
                const token = generateToken(userId);
                const refreshToken = generateRefreshToken(userId);
                user.refreshToken = refreshToken;
                await user.save();
                res.status(200).json({token, refreshToken});
            }else{
                throw new Error('Invalid credentials');
            }
        }else{
            throw new Error('User not found');
        }
    }catch(err:any){
        next(err);
    }
   
};

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.params.id;
        const user = await getUser(userId);
        res.status(200).json(user);
    }catch(err:any){
        next(err);
    }
   
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.params.id;
        const userDetails = req.body;
        const user = await updateUser(userId, userDetails);
        res.status(200).json(user);
    }catch(err:any){
        next(err);
    }

};

export const getUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.body.user._id;
        const user = await getUser(userId);
        res.status(200).json(user);
    }catch(err:any){
        next(err);
    }
   
};

export const updateUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.body.user._id;
        const userDetails = req.body;
        const user = await updateUser(userId, userDetails);
        res.status(200).json(user);
    }catch(err:any){
        next(err);
    }
};

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.body.user;
        user.refreshToken = '';
        await user.save();
        res.status(200).json({message:'Logged out successfully'});
    }catch(err:any){
        next(err);
    }
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const refreshToken = req.body.refreshToken;
        const userId = verifyToken(refreshToken);
        if(typeof userId !== 'string'){
            throw new Error('Invalid token');
        }
        const user = await getUser(userId);
        if(user && user.refreshToken === refreshToken){
            const token = generateToken(userId);
            res.status(200).json({token});
        }else{
            throw new Error('Invalid token');
        }
    }catch(err:any){
        next(err);
    }
};

export const uploadProfilePic = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.body.user._id;
        const user = await getUser(userId);
        if(user){
            if (req.file && req.file.path) {
                user.profilePic = req.file.path;
            } else {
                throw new Error('File not uploaded');
            }
            await user.save();
            res.status(200).json({message:'Profile picture uploaded successfully'});
        }else{
            throw new Error('User not found');
        }
    }catch(err:any){
        next(err);
    }
}

export const forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const email = req.body.email;
        const user = await getUserByEmail(email);
        if(user){
            const token = generateEmailToken(email);
            const link = `${process.env.BASE_URL}/reset-password/${token}`;
            const message = `Click on the link to reset your password: ${link}`;
            await sendEmail(email, 'Reset Password', message);
            res.status(200).json({message:'Password reset link sent successfully'});
        }else{
            throw new Error('User not found');
        }
    }catch(err:any){
        next(err);
    }
};

export const addRole = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.params.id;
        const role = req.body.role;
        const user = await getUser(userId);
        if(user){
            user.role = role;
            await user.save();
            res.status(200).json({message:'Role added successfully'});
        }else{
            throw new Error('User not found');
        }
    }catch(err:any){
        next(err);
    }
};

export const addSkills = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.params.id;
        const skills = req.body.skills;
        const user = await getUser(userId);
        if(user){
            user.skills = skills;
            await user.save();
            res.status(200).json({message:'Skills added successfully'});
        }else{
            throw new Error('User not found');
        }
    }catch(err:any){
        next(err);
    }
};

