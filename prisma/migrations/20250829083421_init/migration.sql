-- DropIndex
DROP INDEX "public"."Chapter_bookId_key";

-- AlterTable
ALTER TABLE "public"."Book" ADD COLUMN     "series" TEXT[];

-- AlterTable
ALTER TABLE "public"."Chapter" ADD COLUMN     "location" TEXT,
ADD COLUMN     "number" INTEGER;
