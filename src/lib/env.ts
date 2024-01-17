import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: zod.string().min(1),
  CLERK_SECRET_KEY: zod.string().min(1),
  MAPBOX_TOKEN: zod.string(),
});

export const env = envSchema.parse(process.env);
