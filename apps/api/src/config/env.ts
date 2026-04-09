import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    HOST: z.string().default('0.0.0.0'),
    DATABASE_URL: z.string().min(1)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('Invalid environment variables:', z.treeifyError(parsed.error));
    process.exit(1);
}

export const env = parsed.data;