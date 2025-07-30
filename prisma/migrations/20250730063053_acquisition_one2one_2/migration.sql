/*
  Warnings:

  - You are about to drop the column `vinylId` on the `Acquisition` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Acquisition" DROP CONSTRAINT "Acquisition_vinylId_fkey";

-- DropIndex
DROP INDEX "public"."Acquisition_vinylId_key";

-- AlterTable
ALTER TABLE "public"."Acquisition" DROP COLUMN "vinylId";

-- AddForeignKey
ALTER TABLE "public"."Acquisition" ADD CONSTRAINT "Acquisition_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."WishedVinyls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
