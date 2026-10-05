-- Adds the three fields the admin Admissions / Students / Courses modules need
-- on top of the models that already existed.
--
--   courses.code        VARCHAR(32)  unique, nullable  staff-facing code (slug stays the URL segment)
--   courses.isActive    BOOLEAN      NOT NULL DEFAULT true, admin lifecycle flag, kept apart from isPublished
--   students.rollNumber VARCHAR(32)  unique, nullable, assigned when an admission is approved
--
-- Purely additive: three nullable/defaulted columns and two unique indexes. No
-- table is dropped, truncated or rewritten, and no existing row needs backfilling.
--
-- Generated with prisma migrate diff --from-config-datasource --to-schema, which
-- reported no drift outside these statements.

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "code" VARCHAR(32),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "rollNumber" VARCHAR(32);

-- CreateIndex
CREATE UNIQUE INDEX "courses_code_key" ON "courses"("code");

-- CreateIndex
CREATE UNIQUE INDEX "students_rollNumber_key" ON "students"("rollNumber");
