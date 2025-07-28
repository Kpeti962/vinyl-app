/*
  Warnings:

  - A unique constraint covering the columns `[author,title]` on the table `MyVinyls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `MyVinyls_author_title_key` ON `MyVinyls`(`author`, `title`);
