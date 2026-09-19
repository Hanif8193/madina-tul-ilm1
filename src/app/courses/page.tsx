import type { Metadata } from "next";
import CoursesHero from "@/components/courses/CoursesHero";
import CoursesTabs from "@/components/courses/CoursesTabs";
import FeaturedProgram from "@/components/courses/FeaturedProgram";

export const metadata: Metadata = {
  title: "Courses & Programs",
  description:
    "From foundational Qur'anic recitation to comprehensive Aalimah studies — structured programs for women at every stage of their Islamic learning journey.",
};

export default function CoursesPage() {
  return (
    <>
      <CoursesHero />
      <CoursesTabs />
      <FeaturedProgram />
    </>
  );
}
