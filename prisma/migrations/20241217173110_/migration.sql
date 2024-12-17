-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TuneTag" (
    "tuneId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TuneTag_pkey" PRIMARY KEY ("tuneId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "TuneTag" ADD CONSTRAINT "TuneTag_tuneId_fkey" FOREIGN KEY ("tuneId") REFERENCES "Tune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TuneTag" ADD CONSTRAINT "TuneTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
