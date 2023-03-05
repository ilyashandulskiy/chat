/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `chatId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `fromUserId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `admin_id` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chat_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from_user_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_B_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "admin_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "chatId",
DROP COLUMN "createdAt",
DROP COLUMN "fileUrl",
DROP COLUMN "fromUserId",
DROP COLUMN "updatedAt",
ADD COLUMN     "chat_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "file_url" TEXT,
ADD COLUMN     "from_user_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "_ChatToUser";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
