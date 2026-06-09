-- CreateEnum
CREATE TYPE "EstadoConsulta" AS ENUM ('BORRADOR', 'EN_CURSO', 'COMPLETADA', 'PENDIENTE', 'CANCELADA');

-- CreateTable
CREATE TABLE "consultas" (
    "id" SERIAL NOT NULL,
    "tipoConsulta" TEXT NOT NULL,
    "estado" "EstadoConsulta" NOT NULL DEFAULT 'BORRADOR',
    "fecha_consulta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pesoActual" DOUBLE PRECISION,
    "temperatura" DOUBLE PRECISION,
    "frecuenciaCardiaca" INTEGER,
    "frecuenciaRespiratoria" INTEGER,
    "trc" TEXT,
    "mucosas" TEXT,
    "motivoConsulta" TEXT NOT NULL,
    "duracionSintomas" TEXT,
    "anamnesis" TEXT,
    "estadoGeneral" TEXT,
    "sistemaCardiovascular" TEXT,
    "sistemaRespiratorio" TEXT,
    "sistemaDigestivo" TEXT,
    "sistemaNeurologico" TEXT,
    "sistemaMusculoEsqueletico" TEXT,
    "pielPelaje" TEXT,
    "diagnosticoPresuntivo" TEXT,
    "diagnosticoDefinitivo" TEXT,
    "indicacionesTutor" TEXT,
    "fechaControl" TIMESTAMP(3),
    "observacionesCierre" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mascota_id" INTEGER NOT NULL,
    "veterinario_id" INTEGER NOT NULL,

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_mascota_id_fkey" FOREIGN KEY ("mascota_id") REFERENCES "mascotas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_veterinario_id_fkey" FOREIGN KEY ("veterinario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
