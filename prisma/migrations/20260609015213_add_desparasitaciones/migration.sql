-- CreateTable
CREATE TABLE "desparasitaciones" (
    "id" SERIAL NOT NULL,
    "producto" TEXT NOT NULL,
    "fecha_aplicacion" TIMESTAMP(3) NOT NULL,
    "fecha_proxima_dosis" TIMESTAMP(3),
    "dosis" TEXT,
    "observaciones" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mascota_id" INTEGER NOT NULL,

    CONSTRAINT "desparasitaciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "desparasitaciones" ADD CONSTRAINT "desparasitaciones_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "mascotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
