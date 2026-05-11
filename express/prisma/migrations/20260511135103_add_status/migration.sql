-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'WISHLIST'
);
INSERT INTO "new_Country" ("description", "id", "imgUrl", "name") SELECT "description", "id", "imgUrl", "name" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
