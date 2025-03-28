'use client'
import { cn } from '@/lib/utils'
import { Copyright, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Footer() {
    const pathname = usePathname()

    if (pathname.startsWith('/dashboard')) return null

    return (
        <footer className="relative flex w-full mt-20 items-center justify-center">
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#accaff_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]", 
                )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background"></div>
            <div className='py-8 relative flex flex-col antialiased z-20'>
                <div className='mx-auto flex items-center w-full justify-center gap-3'>
                    <Github className='text-foreground w-4 h-4' />
                    <Link href={'https://github.com/datodia'} target='_blank' className='!text-foreground'>
                        Github
                    </Link>
                </div>
                <div className='mx-auto flex items-center w-full justify-center gap-3'>
                    <Linkedin className='text-foreground w-4 h-4' />
                    <Link href={'https://www.linkedin.com/in/dato-diasamidze-310a73230/'} target='_blank' className='!text-foreground'>
                        LinkedIn
                    </Link>
                </div>
                <div className='mx-auto flex items-center w-full justify-center gap-3'>
                    <Mail className='text-foreground w-4 h-4' />
                    <h1 className='!text-foreground'>
                        dato.diasamidze.02@gmail.com
                    </h1>
                </div>
                <div className='mx-auto flex items-center w-full justify-center gap-3'>
                    <Copyright className='text-foreground w-4 h-4' />
                    <h1 className='!text-foreground self-center'>{new Date().getFullYear()}</h1>
                    <h1 className='!text-foreground'>
                        ყველა უფლება დაცულია
                    </h1>
                </div>
            </div>
        </footer>
    )
}
