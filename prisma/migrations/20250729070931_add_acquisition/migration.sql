/*
  Warnings:

  - A unique constraint covering the columns `[id,author,title]` on the table `WishedVinyls` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "WishedVinyls_author_title_key";

-- AlterTable
ALTER TABLE "WishedVinyls" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "WishedVinyls_id_seq";

-- CreateTable
CREATE TABLE "Acquisition" (
    "id" SERIAL NOT NULL,
    "vinylId" INTEGER NOT NULL,
    "acquiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Acquisition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Acquisition_vinylId_key" ON "Acquisition"("vinylId");

-- CreateIndex
CREATE UNIQUE INDEX "WishedVinyls_id_author_title_key" ON "WishedVinyls"("id", "author", "title");

-- AddForeignKey
ALTER TABLE "Acquisition" ADD CONSTRAINT "Acquisition_vinylId_fkey" FOREIGN KEY ("vinylId") REFERENCES "WishedVinyls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
