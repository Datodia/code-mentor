'use client'
import { Copyright, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Footer() {
    const pathname = usePathname()
    
    if(pathname.startsWith('/dashboard')) return null
    
    return (
        <div className='bg-foreground mt-20 py-8'>
            <div className='mx-auto flex items-end w-full justify-center gap-5'>
                <Copyright className='text-background w-4 h-4' />
                <h1 className='!text-background'>
                    ყველა უფლება დაცულია
                </h1>
            </div>
            <div className='mx-auto flex items-center w-full justify-center gap-5'>
                <Github className='text-background w-4 h-4' />
                <Link href={'https://github.com/datodia'} target='_blank' className='!text-background'>
                    Github
                </Link>
            </div>
            <div className='mx-auto flex items-center w-full justify-center gap-5'>
                <Mail className='text-background w-4 h-4' />
                <h1 className='!text-background'>
                    dato.diasamidze.02@gmail.com
                </h1>
            </div>
            <div className='mx-auto flex items-center w-full justify-center gap-5'>
                <Linkedin className='text-background w-4 h-4' />
                <Link href={'https://www.linkedin.com/in/dato-diasamidze-310a73230/'} target='_blank' className='!text-background'>
                    LinkedIn
                </Link>
            </div>
        </div>
    )
}
