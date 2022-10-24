/*
  Warnings:

  - You are about to drop the column `drawResult` on the `GroupMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[selectedBy,groupId]` on the table `GroupMember` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GroupMember_drawResult_groupId_key";

-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "drawResult",
ADD COLUMN     "selectedBy" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_selectedBy_groupId_key" ON "GroupMember"("selectedBy", "groupId");
