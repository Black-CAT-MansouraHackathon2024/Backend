import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { getUserByEmail } from '../services/user.services';

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
    const token =jwt.sign({ userId }, process.env.EMAIL_SECRET!, { expiresIn: '1d' });
    const hash = crypto.createHash('sha256').update(token).digest('hex');

    return hash.substring(0, 8);
}

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


export const verifyEmailToken = async (email: string, token: string) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const hashedToken = crypto
            .createHash('sha256')
            .update(token)  
            .digest('hex'); 

        if (user.emailToken === hashedToken) {
            return true; 
        } else {
            return false;
        }
    } catch (err: any) {
        console.error(err);
        return false;
    }
};