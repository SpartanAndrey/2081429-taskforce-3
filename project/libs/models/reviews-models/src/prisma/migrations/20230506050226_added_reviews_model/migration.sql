/*
  Warnings:

  - Added the required column `contractor_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "contractor_id" TEXT NOT NULL;
