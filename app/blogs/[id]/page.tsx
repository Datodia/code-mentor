import { notFound } from 'next/navigation';
import { getBlogById, increaseBlogViewCount } from '../services';
import { Metadata } from "next";
import SingleBlogPage from "@/components/pages/blog";

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${blog.image}`;
  const blogUrl = `https://www.fullstackmentor.space/blogs/${id}`;

  return {
    title: blog.title,
    description: blog.description.substring(0, 160),
    keywords: blog.title,
    alternates: { canonical: blogUrl },
    openGraph: {
      title: blog.title,
      description: blog.description.substring(0, 160),
      url: blogUrl,
      type: 'article',
      siteName: 'Fullstack Mentor',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description.substring(0, 160),
      images: [imageUrl],
    }
  };
}

export default async function Blog({ params }: { params: Params }) {
  const { id } = await params
  const blog = await increaseBlogViewCount(id)
  if (!blog) return notFound()

  return (
    <SingleBlogPage blog={blog} />
  )
}