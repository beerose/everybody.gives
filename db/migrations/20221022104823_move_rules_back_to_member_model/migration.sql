/*
  Warnings:

  - You are about to drop the column `rules` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "rules";

-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN     "cannotDraw" TEXT[] DEFAULT ARRAY[]::TEXT[];
