/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_userProfileId_fkey";

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "userProfileId";
