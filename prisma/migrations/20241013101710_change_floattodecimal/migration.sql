/*
  Warnings:

  - Added the required column `author` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `summary` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `author` VARCHAR(191) NOT NULL,
    MODIFY `price` DECIMAL(10, 2) NOT NULL,
    MODIFY `sell_amount` INTEGER NULL DEFAULT 0;
