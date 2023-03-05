/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `chat_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `from_user_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromUserId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_user_id_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "admin_id",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "chat_id",
DROP COLUMN "created_at",
DROP COLUMN "file_url",
DROP COLUMN "from_user_id",
DROP COLUMN "updated_at",
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "fromUserId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar_url",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "UserInChat" (
    "userId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInChat_userId_chatId_key" ON "UserInChat"("userId", "chatId");

-- AddForeignKey
ALTER TABLE "UserInChat" ADD CONSTRAINT "UserInChat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInChat" ADD CONSTRAINT "UserInChat_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
