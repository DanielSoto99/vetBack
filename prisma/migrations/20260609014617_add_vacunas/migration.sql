-- CreateTable
CREATE TABLE "vacunas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_aplicacion" TIMESTAMP(3) NOT NULL,
    "fecha_proxima_dosis" TIMESTAMP(3),
    "lote" TEXT,
    "laboratorio" TEXT,
    "observaciones" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mascota_id" INTEGER NOT NULL,

    CONSTRAINT "vacunas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vacunas" ADD CONSTRAINT "vacunas_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "mascotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
