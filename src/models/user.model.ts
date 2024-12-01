import mongoose from 'mongoose';


export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role:'innovator' | 'investor' | 'consultant';
    createdAt: Date;
    updatedAt: Date;
    profilePic: string;
    bio: string;
    skills: string[];
    isEmailVerified: boolean;
    refreshToken: string;
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true ,
        enum: ['innovator', 'investor', 'consultant'],
        default: 'innovator'
    },
    profilePic: { type: String, default: '' },
    bio: { type: String, default: '' },
    skills: { type: [String], default: [] },
    isEmailVerified: { type: Boolean, default: false },
    refreshToken: { type: String, default: '' },
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);

export default User;