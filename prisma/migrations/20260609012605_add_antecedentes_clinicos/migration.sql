-- CreateTable
CREATE TABLE "antecedentes_clinicos" (
    "id" SERIAL NOT NULL,
    "alergias" TEXT,
    "enfermedadesPrevias" TEXT,
    "medicamentosActuales" TEXT,
    "condicionCorporal" INTEGER,
    "observaciones" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mascota_id" INTEGER NOT NULL,

    CONSTRAINT "antecedentes_clinicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "antecedentes_clinicos_mascota_id_key" ON "antecedentes_clinicos"("mascota_id");

-- AddForeignKey
ALTER TABLE "antecedentes_clinicos" ADD CONSTRAINT "antecedentes_clinicos_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "mascotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
