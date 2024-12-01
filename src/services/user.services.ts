import { userType } from "../schemas/user.schema";
import User from "../models/user.model";
import { IUser } from "../models/user.model";
import bcrypt from 'bcrypt';
import { generateToken, generateRefreshToken, verifyToken } from "../utils/jwt.utils";
import { get } from "http";
import { generateEmailToken } from "../utils/email.utils";
import { sendEmail } from "../utils/email.utils";
import dotenv from 'dotenv';
dotenv.config();

export const createUser = async (userDetails: userType) => {
    try{
        const password = await bcrypt.hash(userDetails.password, 10);
        const userExists = await getUserByEmail(userDetails.email);

        if(userExists){
            throw new Error('User already exists');
        }

        const user = new User({
            name: userDetails.name,
            email: userDetails.email,
            password: password,
            role: userDetails.role,
            profilePic: userDetails.profilePic || '',
            bio: userDetails.bio || '',
            skills: userDetails.skills || [],
            isEmailVerified: false,
            refreshToken: ''
        });
        const newUser = await user.save();
        const userId: string = (newUser._id as string).toString();
        const refreshToken = generateRefreshToken(userId);
        const emailToken = generateEmailToken(userDetails.email);
        newUser.emailToken = emailToken;
        newUser.refreshToken = refreshToken;
        await newUser.save();

        const verificationLink = `${process.env.BASE_URL}/confirm_email?email=${newUser.email}&token=${emailToken}`;
        const emailText = `Click on the link to verify your email: ${verificationLink}`;
        await sendEmail(newUser.email, 'Email Verification', emailText);

        return newUser;   
    }
    catch(err: any){
        throw new Error(err);
    }
}


export const getUser = async (id: string) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const updateUser = async (id: string, userDetails: userType) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        user.name = userDetails.name;
        user.email = userDetails.email;
        user.password = userDetails.password;
        user.role = userDetails.role;
        user.profilePic = userDetails.profilePic;
        user.bio = userDetails.bio;
        user.skills = userDetails.skills

        const updatedUser = await user.save();
        return updatedUser;
    } catch (err: any) {
        throw new Error(err);
    }

}

export const deleteUser = async (id: string) => {
    try {
        const user = await User.findByIdAndDelete(id);
        return user;
    } catch (err: any) {
        throw new Error(err);
    }

}

export const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (err: any) {
        throw new Error(err);
    }

}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email });
        return user;
    }
    catch (err: any) {
        throw new Error(err);
    }

}

export const getUserProfile = async (id: string) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (err: any) {
        throw new Error(err);
    }

}

export const updateProfile = async (id: string, userDetails: userType) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        user.name = userDetails.name;
        user.email = userDetails.email;
        user.profilePic = userDetails.profilePic;
        user.bio = userDetails.bio;
        user.skills = userDetails.skills;
        const updatedUser = await user.save();
        return updatedUser;
    } catch (err: any) {
        throw new Error(err);
    }

}

export const uploadProfilePic = async (id: string, profilePic: string) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        user.profilePic = profilePic;
        const updatedUser = await user.save();
        return updatedUser;
    } catch (err: any) {
        throw new Error(err);
    }

}