-- CreateTable
CREATE TABLE "mascotas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raza" TEXT,
    "sexo" TEXT,
    "fechaNacimiento" TIMESTAMP(3),
    "pesoActual" DOUBLE PRECISION,
    "colorPelaje" TEXT,
    "microchip" TEXT,
    "esterilizado" BOOLEAN NOT NULL DEFAULT false,
    "observaciones" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tutor_id" INTEGER NOT NULL,

    CONSTRAINT "mascotas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mascotas" ADD CONSTRAINT "mascotas_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
