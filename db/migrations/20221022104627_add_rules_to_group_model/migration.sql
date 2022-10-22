/*
  Warnings:

  - You are about to drop the column `constraints` on the `GroupMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "rules" JSONB[];

-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "constraints";
