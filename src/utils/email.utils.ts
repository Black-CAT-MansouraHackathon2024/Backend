import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { getUserByEmail } from '../services/user.services';
import dptenv from 'dotenv';
dptenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (email: string, subject: string, text: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

export const generateEmailToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.EMAIL_SECRET!, { expiresIn: '1d' });
};

export const verifyEmailToken = (token: string) => {
    return jwt.verify(token, process.env.EMAIL_SECRET!, { algorithms: ['RS256'] });
};
export const generateOtp = (): { otp: string; hashedOtp: string } => {
    const otp = Math.floor(10000000 + Math.random() * 90000000).toString(); 
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    return { otp, hashedOtp };
};

export const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    try {
        const user = await getUserByEmail(email);
        if (!user || !user.emailOtp || !user.emailOtpExpiry) {
            throw new Error('User not found or OTP missing');
        }

        if (user.emailOtpExpiry < new Date()) {
            throw new Error('OTP expired');
        }

        const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
        return hashedOtp === user.emailOtp;
    } catch (err) {
        console.error(err);
        return false;
    }
};



