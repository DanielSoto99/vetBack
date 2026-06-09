-- CreateTable
CREATE TABLE "examenes_solicitados" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'SOLICITADO',
    "resultado" TEXT,
    "observaciones" TEXT,
    "fecha_solicitud" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_resultado" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "consulta_id" INTEGER NOT NULL,

    CONSTRAINT "examenes_solicitados_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "examenes_solicitados" ADD CONSTRAINT "examenes_solicitados_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
