/*
  Warnings:

  - You are about to drop the column `total` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `CartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "total";

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "total";
