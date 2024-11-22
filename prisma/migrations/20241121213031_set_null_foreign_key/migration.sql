-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_proprietarioId_fkey`;

-- AlterTable
ALTER TABLE `produto` MODIFY `proprietarioId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_proprietarioId_fkey` FOREIGN KEY (`proprietarioId`) REFERENCES `Proprietario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
