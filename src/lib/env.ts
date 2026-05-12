import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().default("http://localhost:3000"),
  SHOPEE_AFFILIATE_ID: z.string().optional(),
  SHOPEE_AFFILIATE_BASE_URL: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
