-- CreateTable
CREATE TABLE "Livery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postedBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Livery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveryTag" (
    "liveryId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "LiveryTag_pkey" PRIMARY KEY ("liveryId","tagId")
);

-- AddForeignKey
ALTER TABLE "LiveryTag" ADD CONSTRAINT "LiveryTag_liveryId_fkey" FOREIGN KEY ("liveryId") REFERENCES "Livery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveryTag" ADD CONSTRAINT "LiveryTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
