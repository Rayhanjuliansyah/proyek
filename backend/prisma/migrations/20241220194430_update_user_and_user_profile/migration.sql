-- AlterTable
ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
