-- CreateTable
CREATE TABLE "tutores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "rut" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "direccion" TEXT,
    "ciudad" TEXT,
    "observaciones" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "veterinario_id" INTEGER NOT NULL,

    CONSTRAINT "tutores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tutores" ADD CONSTRAINT "tutores_veterinario_id_fkey" FOREIGN KEY ("veterinario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
