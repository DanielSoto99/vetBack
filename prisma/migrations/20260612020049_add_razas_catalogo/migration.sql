/*
  Warnings:

  - You are about to drop the column `especie` on the `mascotas` table. All the data in the column will be lost.
  - You are about to drop the column `raza` on the `mascotas` table. All the data in the column will be lost.
  - Added the required column `especie_id` to the `mascotas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "mascotas" DROP COLUMN "especie",
DROP COLUMN "raza",
ADD COLUMN     "especie_id" INTEGER NOT NULL,
ADD COLUMN     "raza_id" INTEGER;

-- CreateTable
CREATE TABLE "razas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "especie_id" INTEGER NOT NULL,

    CONSTRAINT "razas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "razas_nombre_especie_id_key" ON "razas"("nombre", "especie_id");

-- AddForeignKey
ALTER TABLE "mascotas" ADD CONSTRAINT "mascotas_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "especies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mascotas" ADD CONSTRAINT "mascotas_raza_id_fkey" FOREIGN KEY ("raza_id") REFERENCES "razas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "razas" ADD CONSTRAINT "razas_especie_id_fkey" FOREIGN KEY ("especie_id") REFERENCES "especies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
