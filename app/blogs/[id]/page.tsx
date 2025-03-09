import { mockBlog } from '@/app/mock-blog'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from 'react-markdown';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogById } from '../services';

type Params = Promise<{id: string}>

export default async function Blog({params}: {params: Params}) {
  const {id} = await params
  const blog = await getBlogById(id)
  if (!blog) return notFound()

  const customComponents: Components = {
    h1: ({ ...props }) => <h1 className="text-4xl font-bold text-primary mb-4" {...props} />,
    h2: ({ ...props }) => <h2 className="text-3xl font-semibold text-primary mt-6 mb-4" {...props} />,
    h3: ({ ...props }) => <h3 className="text-2xl font-semibold text-primary/80 mt-4 mb-3" {...props} />,
    p: ({ ...props }) => <p className="text-lg text-foreground mb-4" {...props} />,
    a: ({ ...props }) => <a className="text-primary hover:text-primary/80 underline" {...props} />,
    code: ({ className, children, ...props }) => {
      const isInline = !className?.includes('language-');

      if (isInline) {
        return (
          <code
            className="bg-muted text-foreground rounded px-1 py-0.5 text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        )
      }

      return (
        <pre
          className="bg-muted text-foreground rounded-lg p-4 text-sm font-mono overflow-x-auto"
        >
          <code className="block" {...props}>{children}</code>
        </pre>
      )
    },
    ul: ({ ...props }) => <ul className="list-disc list-outside pl-6 mb-4 text-foreground" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal list-outside pl-6 mb-4 text-foreground" {...props} />,
    strong: ({ ...props }) => <strong className="font-bold text-primary" {...props} />,
    em: ({ ...props }) => <em className="italic text-foreground/80" {...props} />,
    del: ({ ...props }) => <del className="line-through text-muted-foreground" {...props} />
  }

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 lg:px-0">
      <h1 className="text-3xl font-bold mb-6 text-primary">{blog?.title}</h1>
      <div className='max-w-full relative h-[200px] sm:h-[300px] lg:h-[600px] mx-auto'>
        <Image
          src={blog.image}
          alt={blog.image}
          fill
          className='rounded-2xl object-contain lg:object-fill'
        />
      </div>
      <div className="prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={customComponents}
        >
          {blog?.description}
        </ReactMarkdown>
      </div>
    </div>
  )
}