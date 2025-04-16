-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('GENERIC', 'CONTRACT', 'INVOICE', 'LETTER', 'REPORT');

-- CreateEnum
CREATE TYPE "LanguageOptions" AS ENUM ('PORTUGUESE', 'ENGLISH');

-- CreateEnum
CREATE TYPE "PreservationStatus" AS ENUM ('STARTED', 'PRESERVED', 'FAILED');

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "preservationDate" TIMESTAMP(3),
    "preservationStatus" "PreservationStatus" NOT NULL DEFAULT 'STARTED',
    "author" TEXT,
    "uniqueIdentifier" TEXT,
    "documentType" "DocumentType" DEFAULT 'GENERIC',
    "language" "LanguageOptions" DEFAULT 'PORTUGUESE',
    "pdfFilePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "documents_uniqueIdentifier_key" ON "documents"("uniqueIdentifier");

-- CreateIndex
CREATE INDEX "documents_name_idx" ON "documents"("name");
