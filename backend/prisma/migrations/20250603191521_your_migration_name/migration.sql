-- CreateTable
CREATE TABLE "Startup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "valuation" TEXT NOT NULL,
    "valuationNumber" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "foundedYear" INTEGER NOT NULL,
    "logoUrl" TEXT,
    "description" TEXT NOT NULL,
    "isUnicorn" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);
