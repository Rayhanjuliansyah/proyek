/*
  Warnings:

  - You are about to drop the `history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_bookingId_fkey";

-- DropTable
DROP TABLE "history";
