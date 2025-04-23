-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "cnpj" TEXT NOT NULL,
    "inscricaoEstadual" TEXT,
    "razaoSocial" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_cnpj_key" ON "empresas"("cnpj");
