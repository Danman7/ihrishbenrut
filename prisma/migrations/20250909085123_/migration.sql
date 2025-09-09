/*
  Warnings:

  - You are about to drop the column `originalNotes` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `rewriteNotes` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfRewrite` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `ChapterContent` table. All the data in the column will be lost.
  - Added the required column `yearPublished` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Made the column `number` on table `Chapter` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `text` to the `ChapterContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Book" DROP COLUMN "originalNotes",
DROP COLUMN "rewriteNotes",
DROP COLUMN "yearOfRewrite",
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "yearPublished" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Chapter" ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "number" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."ChapterContent" DROP COLUMN "content",
ADD COLUMN     "text" TEXT NOT NULL;
