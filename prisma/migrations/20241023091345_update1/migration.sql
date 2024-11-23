-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
