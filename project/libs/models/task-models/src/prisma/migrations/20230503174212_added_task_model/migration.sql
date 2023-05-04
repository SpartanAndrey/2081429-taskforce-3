-- CreateEnum
CREATE TYPE "City" AS ENUM ('Moscow', 'SaintPetersburg', 'Vladivostok');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'Canceled', 'InWork', 'Completed', 'Failed');

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "category_id" INTEGER NOT NULL,
    "price" INTEGER DEFAULT 0,
    "dueDate" TIMESTAMP(3),
    "image" TEXT DEFAULT '',
    "address" TEXT DEFAULT '',
    "tags" TEXT[],
    "city" "City" NOT NULL,
    "user_id" TEXT,
    "contractor_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish_at" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "responses" TEXT[],
    "responses_total" INTEGER DEFAULT 0,
    "comments_total" INTEGER DEFAULT 0,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "categories" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_title_key" ON "categories"("title");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
