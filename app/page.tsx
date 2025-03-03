import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CourseCard from "@/components/ui/course-card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[1240px] mx-auto">
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </div>
  );
}
