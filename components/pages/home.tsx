'use client'
import Blogs from "@/components/layout/blogs";
import Courses from "@/components/layout/courses";
import Students from "@/components/layout/students";
import useAuth from "@/hooks/useAuth";

export default function HomePage() {
//   const {user} = useAuth()
  return (
    <>
      <Courses />
      <Blogs />
      <Students />
    </>
  );
}
