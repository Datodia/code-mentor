import Blogs from "@/components/layout/blogs";
import Courses from "@/components/layout/courses";
import Students from "@/components/layout/students";
import { getAllChallenges } from "@/app/challenges/services";
import { getAllBlogs } from "@/app/blogs/services";
import { getAllCourses } from "@/app/courses/services";
import { getAllFeedbacks } from "@/app/feedbacks/services";
import Challenges from "@/components/layout/challenges";

export const revalidate = 1800; 

export default async function Home() {
  const [challenges, blogs, courses, feedbacks] = await Promise.all([
    getAllChallenges('/challenges', 'take=6'),
    getAllBlogs('/blogs', 'take=3'),
    getAllCourses('/courses'),
    getAllFeedbacks('/feedbacks')
  ])

  return (
    <div className="max-w-[1240px] mx-auto">
      <Challenges challenges={challenges} />
      <Blogs blogs={blogs} />
      <Courses courses={courses} />
      <Students feedbacks={feedbacks} />
    </div>
  );
}
