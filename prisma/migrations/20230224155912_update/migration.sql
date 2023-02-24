/*
  Warnings:

  - You are about to alter the column `name` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `name` VARCHAR(15) NOT NULL;
