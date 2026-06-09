-- CreateTable
CREATE TABLE "archivos_clinicos" (
    "id" SERIAL NOT NULL,
    "nombre_original" TEXT NOT NULL,
    "nombre_archivo" TEXT NOT NULL,
    "tipo_mime" TEXT,
    "url" TEXT NOT NULL,
    "categoria" TEXT,
    "observaciones" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mascota_id" INTEGER NOT NULL,
    "consulta_id" INTEGER,
    "examen_id" INTEGER,

    CONSTRAINT "archivos_clinicos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "archivos_clinicos" ADD CONSTRAINT "archivos_clinicos_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "mascotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archivos_clinicos" ADD CONSTRAINT "archivos_clinicos_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consultas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archivos_clinicos" ADD CONSTRAINT "archivos_clinicos_examen_id_fkey" FOREIGN KEY ("examen_id") REFERENCES "examenes_solicitados"("id") ON DELETE SET NULL ON UPDATE CASCADE;
