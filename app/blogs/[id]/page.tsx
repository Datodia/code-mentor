import { mockBlog } from '@/app/mock-blog'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from 'react-markdown';
import { notFound } from 'next/navigation';

export default async function Blog({params}: {params: {id: string}}) {
  const {id} = await params
  const blog = mockBlog.find(el => el.id === id)

  const customComponents: Components = {
    h1: ({node, ...props}) => <h1 className="text-4xl font-bold text-primary mb-4" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-3xl font-semibold text-primary mt-6 mb-4" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-2xl font-semibold text-primary/80 mt-4 mb-3" {...props} />,
    p: ({node, ...props}) => <p className="text-lg text-foreground mb-4" {...props} />,
    a: ({node, ...props}) => <a className="text-primary hover:text-primary/80 underline" {...props} />,
    code: ({node, className, children, ...props}) => {
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
    ul: ({node, ...props}) => <ul className="list-disc list-outside pl-6 mb-4 text-foreground" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal list-outside pl-6 mb-4 text-foreground" {...props} />,
    strong: ({node, ...props}) => <strong className="font-bold text-primary" {...props} />,
    em: ({node, ...props}) => <em className="italic text-foreground/80" {...props} />,
    del: ({node, ...props}) => <del className="line-through text-muted-foreground" {...props} />
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">{blog?.title}</h1>
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