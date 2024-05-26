-- CreateEnum
CREATE TYPE "FeelingType" AS ENUM ('POSITIVE', 'NEGATIVE');

-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('VERY_POSITIVE', 'POSITIVE', 'NEUTRAL', 'NEGATIVE', 'VERY_NEGATIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sentiment" "Sentiment" NOT NULL,
    "content" TEXT,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feeling" (
    "id" TEXT NOT NULL,
    "type" "FeelingType" NOT NULL,
    "slug" TEXT NOT NULL,
    "display" TEXT NOT NULL,

    CONSTRAINT "Feeling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeelingComment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entryId" TEXT NOT NULL,
    "feelingId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "FeelingComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntryToFeeling" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_EntryToFeeling_AB_unique" ON "_EntryToFeeling"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryToFeeling_B_index" ON "_EntryToFeeling"("B");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeelingComment" ADD CONSTRAINT "FeelingComment_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeelingComment" ADD CONSTRAINT "FeelingComment_feelingId_fkey" FOREIGN KEY ("feelingId") REFERENCES "Feeling"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToFeeling" ADD CONSTRAINT "_EntryToFeeling_A_fkey" FOREIGN KEY ("A") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToFeeling" ADD CONSTRAINT "_EntryToFeeling_B_fkey" FOREIGN KEY ("B") REFERENCES "Feeling"("id") ON DELETE CASCADE ON UPDATE CASCADE;
