import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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

export const verifyEmailToken = (token: string) => {
   
};