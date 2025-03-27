import Blogs from "@/components/layout/blogs";
import Courses from "@/components/layout/courses";
import Students from "@/components/layout/students";
import Challenges from "../layout/challenges";

export default function HomePage() {
  return (
    <>
      <Challenges />
      <Blogs />
      <Courses />
      <Students />
    </>
  );
}
