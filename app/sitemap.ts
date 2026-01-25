import type { MetadataRoute } from "next";
import { getAllCourses } from "./courses/services";
import { getAllChallenges } from "./challenges/services";
import { getAllBlogs } from "./blogs/services";

const BASE = "https://www.fullstackmentor.space";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [challenges, blogs, courses] = await Promise.all([
    getAllChallenges("/challenges").catch(() => ({ challenges: [] } as any)),
    getAllBlogs("/blogs").catch(() => ({ blogs: [] } as any)),
    getAllCourses("/courses").catch(() => [] as any[]),
  ]);

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${BASE}`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/courses`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blogs`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/challenges`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const courseRoutes = (courses || []).map((course: any) => ({
    url: `${BASE}/courses/${course._id}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes = (blogs?.blogs || []).map((blog: any) => ({
    url: `${BASE}/blogs/${blog._id}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const challengeRoutes = (challenges?.challenges || []).map((challenge: any) => ({
    url: `${BASE}/challenges/${challenge._id}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...courseRoutes, ...blogRoutes, ...challengeRoutes];
}
