import { notFound } from 'next/navigation';
import { getBlogById } from '../services';
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

  return {
    title: blog.title,
    description: blog.description.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.description.substring(0, 160),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ],
      type: 'article',
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
  const blog = await getBlogById(id)
  if (!blog) return notFound()
   

  return (
    <SingleBlogPage blog={blog} />
  )
}