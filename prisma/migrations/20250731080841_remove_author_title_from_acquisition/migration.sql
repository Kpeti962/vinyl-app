/*
  Warnings:

  - You are about to drop the column `author` on the `Acquisition` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Acquisition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Acquisition" DROP COLUMN "author",
DROP COLUMN "title";
