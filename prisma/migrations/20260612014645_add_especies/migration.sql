-- CreateTable
CREATE TABLE "especies" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "especies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "especies_nombre_key" ON "especies"("nombre");
