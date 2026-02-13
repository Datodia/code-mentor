'use client'

import { LayoutTextFlip } from '@/components/ui/layout-text-flip'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className='max-w-[1240px] mx-auto px-4 xl:px-0 py-12 lg:py-20'>
      <div className='text-center space-y-6'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex flex-col items-center justify-center gap-2'
        >
          <LayoutTextFlip
            text='პროგრამირების კურსები'
            words={['Frontend-ში', 'Backend-ში', 'Fullstack-ში', 'JavaScript-ში', 'React-ში', 'Node.js-ში']}
            duration={2500}
          />
        </motion.h1>

        <p className='text-base md:text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in'>
          ისწავლე ფრონტენდ, ბექენდ და ფულსტეკ პროგრამირება რეალური პროექტებით.
          JavaScript, React, Node.js, NestJS კურსები, გამოწვევები და მენტორობა.
        </p>

        <div className='flex gap-4 justify-center flex-wrap pt-4 animate-fade-in-delay'>
          <Link
            href='/courses'
            className='px-6 py-3 rounded-md bg-foreground text-primary-foreground hover:bg-foreground/90 font-semibold transition-all hover:scale-105'
          >
            კურსები
          </Link>
          <Link
            href='/challenges'
            className='px-6 py-3 rounded-md border border-foreground hover:bg-foreground hover:text-primary-foreground font-semibold transition-all hover:scale-105'
          >
            გამოწვევები
          </Link>
        </div>
      </div>
    </section>
  )
}
