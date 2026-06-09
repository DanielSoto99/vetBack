-- CreateTable
CREATE TABLE "tratamientos_medicamentos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "dosis" TEXT,
    "frecuencia" TEXT,
    "duracion" TEXT,
    "via" TEXT,
    "indicaciones" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "consulta_id" INTEGER NOT NULL,
    "mascotaId" INTEGER,

    CONSTRAINT "tratamientos_medicamentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tratamientos_medicamentos" ADD CONSTRAINT "tratamientos_medicamentos_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tratamientos_medicamentos" ADD CONSTRAINT "tratamientos_medicamentos_mascotaId_fkey" FOREIGN KEY ("mascotaId") REFERENCES "mascotas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
