import 'dotenv/config';
import z from 'zod';

export const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
});

const env = envSchema.parse(process.env);

export { env };
