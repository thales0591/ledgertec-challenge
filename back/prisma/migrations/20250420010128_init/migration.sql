/*
  Warnings:

  - A unique constraint covering the columns `[transferId]` on the table `documents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ingestId]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "ingestId" TEXT,
ADD COLUMN     "transferId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "documents_transferId_key" ON "documents"("transferId");

-- CreateIndex
CREATE UNIQUE INDEX "documents_ingestId_key" ON "documents"("ingestId");
