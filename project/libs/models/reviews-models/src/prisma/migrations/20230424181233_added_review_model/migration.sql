-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "review" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
