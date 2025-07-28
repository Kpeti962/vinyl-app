-- CreateTable
CREATE TABLE "WishedVinyls" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "WishedVinyls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WishedVinyls_author_title_key" ON "WishedVinyls"("author", "title");
