-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AUTHOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'AUTHOR';
