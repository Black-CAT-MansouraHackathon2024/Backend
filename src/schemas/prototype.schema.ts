import {z} from 'zod';

export const createPrototypeSchema = z.object({
   ideaId: z.string(),
    prototypeUrl: z.string().min(3),
    status: z.enum(['in progress', 'completed']).default('in progress'),
    developerId: z.string(),
    createdAt: z.string().default(new Date().toISOString())
});

export type prototypeType = z.infer<typeof createPrototypeSchema>;