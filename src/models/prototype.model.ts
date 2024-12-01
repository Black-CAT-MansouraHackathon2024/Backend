import mongoose from 'mongoose'

export interface IPrototype {
    ideaId: mongoose.Schema.Types.ObjectId;
    prototypeUrl: string;
    status: 'in progress' | 'completed';
    createdAt: Date;
    developerId: mongoose.Schema.Types.ObjectId;
}

export const prototypeSchema = new mongoose.Schema<IPrototype>({
    ideaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Idea'
    },
    prototypeUrl: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['in progress', 'completed'],
        default: 'in progress'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    developerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

export const Prototype = mongoose.model<IPrototype>('Prototype', prototypeSchema);