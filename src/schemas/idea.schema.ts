import {z} from 'zod';

export const ideaSchema = z.object({
  title: z.string(),
  description: z.string(),
    category: z.enum(['Technology', 'Agriculture', 'Health', 'Industry', 'Economy', 'Community Service', 'Education', 'Energy']),
    status: z.enum(['draft', 'submitted', 'funded']),
    resourcesRequired: z.array(z.string()),
    craetedAt: z.date().optional(),
    updatedAt: z.date().optional(),
    creatorId: z.string(),
});

export type ideaType = z.infer<typeof ideaSchema>;


