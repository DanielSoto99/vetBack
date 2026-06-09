-- CreateTable
CREATE TABLE "recetas" (
    "id" SERIAL NOT NULL,
    "numero" TEXT,
    "indicaciones" TEXT,
    "observaciones" TEXT,
    "emitida" BOOLEAN NOT NULL DEFAULT false,
    "fecha_emision" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "consulta_id" INTEGER NOT NULL,

    CONSTRAINT "recetas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recetas_numero_key" ON "recetas"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "recetas_consulta_id_key" ON "recetas"("consulta_id");

-- AddForeignKey
ALTER TABLE "recetas" ADD CONSTRAINT "recetas_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consultas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
