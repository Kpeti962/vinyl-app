/*
  Warnings:

  - You are about to drop the `myvinyls` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `myvinyls`;

-- CreateTable
CREATE TABLE `WishedVinyls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `WishedVinyls_author_title_key`(`author`, `title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
