import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_EISLm2nQJtU9@ep-empty-resonance-aiwcvx2w-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
