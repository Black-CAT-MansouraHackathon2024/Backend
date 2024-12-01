import { NextFunction, Request, Response } from 'express';
import { createUser, getUserByEmail, getUser, updateUser } from '../services/user.services';
import { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import { generateEmailToken, verifyEmailToken, sendEmail } from '../utils/email.utils';
import { createUserSchema } from '../schemas/user.schema';
import { generateToken, generateRefreshToken, verifyToken } from '../utils/jwt.utils';

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = createUserSchema.parse(req.body);
        const userExists = await getUserByEmail(validatedData.email);
        if (userExists) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const user = {
            name: validatedData.name,
            email: validatedData.email,
            password: validatedData.password,
            role: validatedData.role,
            profilePic: validatedData.profilePic || '',
            bio: validatedData.bio || '',
            skills: validatedData.skills || [],
            isEmailVerified: false,
            refreshToken: ''
        };
        const newUser = await createUser(user as IUser);
        const userId: string = (newUser._id as string).toString();
        const refreshToken = newUser.refreshToken;
        const accessToken = generateToken(userId);
        const emailToken = generateEmailToken(userId);
        const url = `http://localhost:3000/auth/confirm-email?token=${emailToken}`;
        const emailText = `Click this link to confirm your email: ${url}`;
        await sendEmail(validatedData.email, 'Confirm Email', emailText);

        return res.status(201).send({ message: 'User created successfully', accessToken, refreshToken });
    } catch (err: any) {
        next(err);
    }
};

export const confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({ msg: 'No token provided' });
    }
    try {
        const decoded = verifyEmailToken(token as string) as any;
        if (!decoded) {
            return res.status(400).json({ msg: 'Invalid token' });
        }
        let userId: string;
        if (typeof decoded !== 'string' && 'userId' in decoded) {
            userId = decoded.userId;
        } else {
            return res.status(400).json({ msg: 'Invalid token' });
        }
        const user = await getUser(userId);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid token' });
        }
        user.isEmailVerified = true;
        await user.save();
        res.json({ msg: 'Email confirmed successfully' });
    } catch (err: any) {
        next(err);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        if (!user.isEmailVerified) {
            return res.status(400).send({ message: 'Email not verified' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }
        const userId = (user._id as string).toString();
        const accessToken = generateToken(userId);
        const refreshToken = generateRefreshToken(userId);
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).send({ message: 'Login successful', accessToken, refreshToken });
    } catch (err: any) {
        next(err);
    }
};

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId;
        const user = await getUser(userId);
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        return res.status(200).send({ user });
    } catch (err: any) {
        next(err);
    }
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId;
        const validatedData = createUserSchema.parse(req.body);
        const user = await getUser(userId);
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        user.name = validatedData.name;
        user.email = validatedData.email;
        user.password = validatedData.password;
        user.role = validatedData.role;
        user.profilePic = validatedData.profilePic;
        const updatedUser = await updateUser(userId, user);
        return res.status(200).send({ message: 'User updated successfully', user: updatedUser });
    } catch (err: any) {
        next(err);
    }
};

export const getUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const user = await getUser(userId);
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        return res.status(200).send({ user });
    } catch (err: any) {
        next(err);
    }
};

export const updateUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const validatedData = createUserSchema.parse(req.body);
        const user = await getUser(userId);
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        user.name = validatedData.name;
        user.email = validatedData.email;
        user.password = validatedData.password;
        user.role = validatedData.role;
        user.profilePic = validatedData.profilePic;
        const updatedUser = await updateUser(userId, user);
        return res.status(200).send({ message: 'User updated successfully', user: updatedUser });
    } catch (err: any) {
        next(err);
    }
};

export const uploadProfilePicController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId;
        const user = await getUser(userId);
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        if (req.file && req.file.path) {
            user.profilePic = req.file.path;
        } else {
            return res.status(400).send({ message: 'No file uploaded' });
        }
        const updatedUser = await updateUser(userId, user);
        return res.status(200).send({ message: 'Profile pic uploaded successfully', user: updatedUser });
    } catch (err: any) {
        next(err);
    }
};

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        const user = await getUser(userId);
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        user.refreshToken = ''; 
        await user.save();
        return res.status(200).send({ message: 'Logged out successfully' });
    } catch (err: any) {
        next(err);
    }
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).send({ message: 'Refresh token not provided' });
        }
        const decoded = verifyToken(refreshToken);
        if (!decoded) {
            return res.status(400).send({ message: 'Invalid refresh token' });
        }
        let userId: string;
        if (typeof decoded !== 'string' && 'userId' in decoded) {
            userId = decoded.userId;
        } else {
            return res.status(400).send({ message: 'Invalid refresh token' });
        }
        const user = await getUser(userId);
        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }
        if (user.refreshToken !== refreshToken) {
            return res.status(400).send({ message: 'Invalid refresh token' });
        }
        const accessToken = generateToken(userId);
        const newRefreshToken = generateRefreshToken(userId);
        user.refreshToken = newRefreshToken;
        await user.save();
        return res.status(200).send({ message: 'Token refreshed successfully', accessToken, refreshToken: newRefreshToken });
    } catch (err: any) {
        next(err);
    }
};
