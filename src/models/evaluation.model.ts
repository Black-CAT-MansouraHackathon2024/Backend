import mongoose from 'mongoose'

export interface IEvaluation {
    ideaId: mongoose.Schema.Types.ObjectId;
    evaluatorId: mongoose.Schema.Types.ObjectId;
    feasibilityScore: number;
    marketPotentialScore: number;
    riskAssessment:number;
    comments:string;
    createdAt:Date;
}

export const evaluationSchema = new mongoose.Schema<IEvaluation>({
    ideaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Idea'
    },
    evaluatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    feasibilityScore: {
        type: Number,
        required: true
    },
    marketPotentialScore: {
        type: Number,
        required: true
    },
    riskAssessment: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Evaluation = mongoose.model<IEvaluation>('Evaluation', evaluationSchema);

