import {z} from 'zod';

export const EvaluationSchema = z.object({
 ideaId: z.string().nonempty(),
 evaluatorId: z.string().nonempty(),
 feasibilityScore: z.number().int().positive(),
 marketPotentialScore: z.number().int().positive(),
 riskAssessment: z.number().int().positive(),
 comments: z.string().nonempty(),
 createdAt: z.date().default(new Date())
});

export type EvaluationType = z.infer<typeof EvaluationSchema>;