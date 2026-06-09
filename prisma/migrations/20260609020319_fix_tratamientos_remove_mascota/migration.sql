/*
  Warnings:

  - You are about to drop the column `mascotaId` on the `tratamientos_medicamentos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tratamientos_medicamentos" DROP CONSTRAINT "tratamientos_medicamentos_mascotaId_fkey";

-- AlterTable
ALTER TABLE "tratamientos_medicamentos" DROP COLUMN "mascotaId";
