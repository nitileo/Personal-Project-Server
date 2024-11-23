/*
  Warnings:

  - You are about to drop the column `is_paid` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `shoppingcart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `payment` DROP COLUMN `is_paid`;

-- AlterTable
ALTER TABLE `shoppingcart` DROP COLUMN `summary`;
