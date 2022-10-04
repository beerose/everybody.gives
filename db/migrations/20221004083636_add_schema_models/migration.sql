/*
  Warnings:

  - You are about to drop the column `amount` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `event` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,groupId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[drawResult,groupId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `settings` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "amount",
DROP COLUMN "deadline",
DROP COLUMN "event",
ADD COLUMN     "settings" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "role",
ADD COLUMN     "constraints" TEXT[],
ADD COLUMN     "drawResult" TEXT,
ADD COLUMN     "groupId" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Member";

-- CreateIndex
CREATE UNIQUE INDEX "User_name_groupId_key" ON "User"("name", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "User_drawResult_groupId_key" ON "User"("drawResult", "groupId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
