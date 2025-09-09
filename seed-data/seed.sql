CREATE TABLE "user" (
  "id" TEXT PRIMARY KEY,
  "firstName" TEXT,
  "lastName" TEXT
);
CREATE TABLE "task" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT REFERENCES "user" ("id"),
  "title" TEXT,
  "status" TEXT
);
INSERT INTO "user" ("id", "firstName", "lastName")
VALUES (
    'e4cddeaa-adbf-49f0-9392-bca920f27d55',
    'Jane',
    'Doe'
  );
INSERT INTO "user" ("id", "firstName", "lastName")
VALUES (
    'bc734f64-8be3-4b8c-b7b0-a67a12b24bd4',
    'John',
    'Doe'
  );
INSERT INTO "task" ("id", "userId", "title", "status")
VALUES (
    'ec0b5514-8b76-41ba-a1e7-4e7f520f07fd',
    'bc734f64-8be3-4b8c-b7b0-a67a12b24bd4',
    'Buy milk',
    'todo'
  );