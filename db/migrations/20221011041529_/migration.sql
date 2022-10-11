/*
  Warnings:

  - You are about to drop the column `settings` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "settings",
ADD COLUMN     "createdBy" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "eventName" TEXT NOT NULL DEFAULT '';
