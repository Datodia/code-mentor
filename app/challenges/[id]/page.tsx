import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from 'react-markdown';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getChallengeById } from '../services';
import Link from "next/link";
import { Code, Figma, FileArchive, HandCoins, Puzzle } from "lucide-react";
import { levelMapper } from "@/lib/utils";
import BackButton from "@/components/ui/back-button";
import { Metadata } from "next";

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params;
    const challenge = await getChallengeById(id);
    
    if (!challenge) {
      return {
        title: 'Challenge Not Found',
      };
    }
    
    const imageUrl = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${challenge.image}`;
    
    return {
      title: challenge.title,
      description: challenge.description,
      openGraph: {
        title: challenge.title,
        description: challenge.description,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: challenge.title,
          }
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: challenge.title,
        description: challenge.description,
        images: [imageUrl],
      }
    };
  }

export default async function Challenge({ params }: { params: Params }) {
    const { id } = await params
    const challenge = await getChallengeById(id)
    if (!challenge) return notFound()

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
            <BackButton href="/challenges" />
            <div className="flex flex-col md:flex-row  mx-auto rounded-md">
                <div className='mx-auto w-full h-[200px] relative md:h-[300px] lg:h-[400px]'>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${challenge.image}`}
                        alt={challenge.image}
                        fill
                        className='rounded-2xl object-contain '
                    />
                </div>
                <div className="prose max-w-none w-full p-4 flex flex-col gap-3 md:px-10">
                    <h1 className="text-sm md:text-lg text-center font-bold">{challenge.title}</h1>

                    <div className="flex items-center gap-2">
                        <Figma className="w-4 md:w-5" />
                        <h2 className="text-sm md:text-lg font-semibold">ფიგმას დიზაინი: </h2>
                        <Link target="_blank" href={challenge.figma} className="text-blue-600 font-semibold text-sm md:text-lg">ლინკი</Link>
                    </div>
                    {challenge.source ?
                        <div className="flex gap-2 items-center">
                            <FileArchive className="w-4 md:w-5" />
                            <h2 className="text-sm md:text-lg font-semibold">გადმოიწერე საწყისი: </h2>
                            <Link href={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${challenge.source}`} className="text-blue-600 font-semibold text-sm md:text-lg">კოდი</Link>
                        </div> : null}
                    <div className="flex gap-2 items-center">
                        <Code className="w-4 md:w-5" />
                        <h2 className="text-sm md:text-lg font-semibold">სტეკი: <span className="uppercase">{challenge.type}</span> </h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Puzzle className="w-4 md:w-5" />
                        <h2 className="text-sm md:text-lg font-semibold">დონე: {levelMapper(challenge.level)} </h2>
                    </div>
                    <div className="flex gap-2 items-center">
                        <HandCoins className="w-4 md:w-5" />
                        <h2 className="text-sm md:text-lg font-semibold">ფასი: {challenge.price || 'უფასო'} </h2>
                    </div>


                </div>
            </div>
            <div className="prose max-w-none mt-6">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={customComponents}
                >
                    {challenge?.description}
                </ReactMarkdown>
            </div>
        </div>
    )
}