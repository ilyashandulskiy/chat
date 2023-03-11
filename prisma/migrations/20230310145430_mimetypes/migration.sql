/*
  Warnings:

  - You are about to drop the column `downloadPath` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `previewPath` on the `File` table. All the data in the column will be lost.
  - Added the required column `mimeType` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "downloadPath",
DROP COLUMN "previewPath",
ADD COLUMN     "mimeType" TEXT NOT NULL;
