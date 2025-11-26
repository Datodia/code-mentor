'use client'

import Image from 'next/image'
import BackButton from "@/components/ui/back-button"
import { Eye } from "lucide-react"
import { Blog } from "@/types"
import MarkdownPreview from '../ui/markwown-preview'

type PropType = {
    blog: Blog
}

export default function SingleBlogPage({ blog }: PropType) {
    return (
        <div className="max-w-[1240px] mx-auto px-4 py-8 lg:px-0">
            <div className="flex justify-between items-start">
                <BackButton href="/blogs" />
                <span className="flex items-center gap-2 bg-foreground text-background px-3 py-1 rounded-2xl text-base lg:text-md">
                    <Eye className="w-4 lg:w-5" />
                    {blog.views}
                </span>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-primary">{blog?.title}</h1>

            <div className='max-w-full relative h-[200px] sm:h-[300px] lg:h-[600px] mx-auto mb-8'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${blog.image}`}
                    alt={blog.title}
                    fill
                    className='rounded-2xl object-contain'
                />
            </div>
            
            <MarkdownPreview 
                content={blog?.description} 
                className="prose prose-lg max-w-none"
                size="lg"
                enableImageUpload={true}
            />
        </div>
    )
}