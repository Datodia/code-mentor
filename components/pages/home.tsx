import Blogs from "@/components/layout/blogs";
import Courses from "@/components/layout/courses";
import Students from "@/components/layout/students";
import Challenges from "../layout/challenges";
import { getAllChallenges } from "@/app/challenges/services";
import { getAllBlogs } from "@/app/blogs/services";
import { getAllCourses } from "@/app/courses/services";
import { getAllFeedbacks } from "@/app/feedbacks/services";


export default async function HomePage() {
  const [challenges, blogs, courses, feedbacks] = await Promise.all([
    getAllChallenges('/challenges', 'take=6'),
    getAllBlogs('/blogs', 'take=3'),
    getAllCourses('/courses'),
    getAllFeedbacks('/feedbacks')
  ])

  return (
    <>
      <Challenges challenges={challenges}  />
      <Blogs blogs={blogs} />
      <Courses courses={courses} />
      <Students feedbacks={feedbacks} />
    </>
  );
}
