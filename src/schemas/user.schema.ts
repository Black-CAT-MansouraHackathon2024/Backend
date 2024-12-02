import {z} from 'zod';
import User from '../models/user.model';
import {IUser} from '../models/user.model';

export const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['innovator', 'investor', 'consultant']).default('innovator'),
    profilePic: z.string().default(''),
    bio: z.string().default(''),
    skills: z.array(z.string()).default([]),
    isEmailVerified: z.boolean().default(false),
    refreshToken: z.string().default(''),
    emailToken: z.string().optional(),
    emailOtp: z.string().optional(),
    emailOtpExpiry: z.date().optional(),
});

export type userType = z.infer<typeof createUserSchema>;





