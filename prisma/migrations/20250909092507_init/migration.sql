/*
  Warnings:

  - You are about to drop the column `date` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Chapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Chapter" DROP COLUMN "date",
DROP COLUMN "location",
ADD COLUMN     "notes" TEXT;
