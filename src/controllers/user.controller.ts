import { NextFunction, Request, Response } from 'express';
import { createUser, getUserByEmail, getUser, updateUser, getEmail } from '../services/user.services';
import { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import { generateEmailToken, verifyEmailToken, sendEmail, generateOtp, verifyOtp } from '../utils/email.utils';
import { createUserSchema } from '../schemas/user.schema';
import { generateToken, generateRefreshToken, verifyToken } from '../utils/jwt.utils';
import cloudnary from '../middlewares/cloud.middleware';
import { custom } from 'zod';
import upload  from '../utils/multer.utils'


export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'innovator',
            bio: req.body.bio || '',
            profilePic: req.body.profilePicture || '',
            refreshToken: '',
            skills: req.body.skills || [],
            emailotp: '',
            emailOtpExpiry: new Date(),
        };
        const result = await createUser(user);
        res.status(201).json(result);
    } catch (err: any) {
        next(err);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await getUserByEmail(email);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const userId = (user._id as string).toString();
                const token = generateToken(userId);
                const refreshToken = generateRefreshToken(userId);
                user.refreshToken = refreshToken;
                await user.save();
                res.status(200).json({ token, refreshToken });
            } else {
                throw new Error('Invalid credentials');
            }
        } else {
            throw new Error('User not found');
        }
    } catch (err: any) {
        next(err);
    }

};

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authUser = req.body.user;
        const userId = req.params.id;
        console.log(authUser);
        console.log(userId);
        if (authUser._id.toString() !== userId) {
            next(new Error('Unauthorized'));
        }
        const user = await getUser(userId);
        res.status(200).json(user);
    } catch (err: any) {
        next(err);
    }

};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const authUser = req.body.user;
        if (authUser._id.toString() !== userId) {
            next(new Error('Unauthorized'));
        }
        const userDetails = req.body;
        const user = await updateUser(userId, userDetails);
        res.status(200).json(user);
    } catch (err: any) {
        next(err);
    }

};

export const getUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.user._id;
        const user = await getUser(userId);
        res.status(200).json(user);
    } catch (err: any) {
        next(err);
    }

};

export const updateUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.user._id;
        const authUser = req.body.user;
        if (authUser._id !== userId) {
            next(new Error('Unauthorized'));
        }
        const userDetails = req.body;
        const user = await updateUser(userId, userDetails);
        res.status(200).json(user);
    } catch (err: any) {
        next(err);
    }
};

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body.user;
        user.refreshToken = '';
        await user.save();
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err: any) {
        next(err);
    }
};

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
   try{
     const refreshToken = req.body.refreshToken;
        const decoded = verifyToken(refreshToken) as {
            user: any; iat: number; exp: number;
};
        console.log(decoded);
        console.log(refreshToken);
        const userId = decoded.user.id;
        const user = await getUser(userId);
        if (user?.refreshToken === refreshToken) {
            const token = generateToken(userId);
            res.status(200).json({ token });
        } else {
            throw new Error('Invalid refresh token');
        }
   }
   catch(err: any){
    next(err);
   }
};

export const uploadProfilePic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.user._id;
        console.log("uu",userId);
        const user = await getUser(userId);
        if (user) {
            if (!req.file) {
                throw new Error('File not provided');
            }
            const result = await cloudnary.uploader.upload(req.file.path)
            user.profilePic = result.secure_url;
            await user.save();
            res.status(200).json({ profilePic: user.profilePic });
        }
    } catch (err: any) {
        next(err);
    }
}

export const forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const { otp, hashedOtp } = generateOtp();

        user.emailOtp = hashedOtp;
        user.emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        const message = `Your password reset OTP is: ${otp}`;
        await sendEmail(email, 'Reset Password OTP', message);

        res.status(200).json({ message: 'Password reset OTP sent successfully' });
    } catch (err) {
        next(err);
    }
};


export const addRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const authUser = req.body.user;
        console.log(authUser);
        console.log(userId);
        if (authUser._id.toString() !== userId.toString()) {
            next(new Error('Unauthorized'));
        }
        const role = req.body.role;
        const user = await getUser(userId);
        if (user) {
            user.role = role;
            await user.save();
            res.status(200).json({ message: 'Role added successfully' });
        } else {
            next(new Error('User not found'));
        }
    }
    catch (err: any) {
        next(err);
    }
};

export const addSkills = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const authUser = req.body.user;
        if (authUser._id.toString() !== userId.toString()) {
            next(new Error('Unauthorized'));
        }
        const skills = req.body.skills;
        const user = await getUser(userId);
        if (user) {
            user.skills = skills;
            await user.save();
            res.status(200).json({ message: 'Skills added successfully' });
        } else {
            next(new Error('User not found'));
        }

    } catch (err: any) {
        next(err);
    }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp } = req.body;
        const isValid = await verifyOtp(email, otp);

        if (!isValid) {
            throw new Error('Invalid or expired OTP');
        }

        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.emailOtp = undefined;
        user.emailOtpExpiry = undefined;

        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        next(err);
    }
};
