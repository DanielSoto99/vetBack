-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('SUPER_ADMIN', 'VETERINARIO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "rut" TEXT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL DEFAULT 'VETERINARIO',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "debe_cambiar_password" BOOLEAN NOT NULL DEFAULT true,
    "telefono" TEXT,
    "ciudad" TEXT,
    "ultimo_login" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_rut_key" ON "usuarios"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
