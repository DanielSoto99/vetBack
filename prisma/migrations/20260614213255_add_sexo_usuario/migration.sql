-- CreateEnum
CREATE TYPE "SexoUsuario" AS ENUM ('M', 'F', 'OTRO');

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "sexo_usuario" "SexoUsuario" NOT NULL DEFAULT 'M';
