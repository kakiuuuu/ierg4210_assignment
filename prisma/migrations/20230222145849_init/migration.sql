-- CreateTable
CREATE TABLE `Product` (
    `pid` INTEGER NOT NULL AUTO_INCREMENT,
    `cid` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `inventory` INTEGER NOT NULL,

    INDEX `Product_cid_idx`(`cid`),
    PRIMARY KEY (`pid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorie` (
    `cid` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_cid_fkey` FOREIGN KEY (`cid`) REFERENCES `Categorie`(`cid`) ON DELETE RESTRICT ON UPDATE CASCADE;
