/*
  Warnings:

  - You are about to drop the column `chat_id` on the `chat` table. All the data in the column will be lost.
  - Added the required column `admin_id` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat" DROP COLUMN "chat_id",
ADD COLUMN     "admin_id" TEXT NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;
