/*
  Warnings:

  - You are about to drop the column `raza_id` on the `mascotas` table. All the data in the column will be lost.
  - You are about to drop the `razas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mascotas" DROP CONSTRAINT "mascotas_raza_id_fkey";

-- DropForeignKey
ALTER TABLE "razas" DROP CONSTRAINT "razas_especie_id_fkey";

-- AlterTable
ALTER TABLE "mascotas" DROP COLUMN "raza_id",
ADD COLUMN     "raza" TEXT;

-- DropTable
DROP TABLE "razas";
