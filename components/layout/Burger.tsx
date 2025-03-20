import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../ui/mode-toggle'
type BurgerPros = {
    setShowBurger: React.Dispatch<React.SetStateAction<boolean>>,
    showBurger: boolean
    navLinks: {
        label: string;
        href: string;
    }[]
}

export default function Burger({setShowBurger, showBurger, navLinks}:BurgerPros) {
  return (
    <section className='md:hidden'>
        {showBurger ? 
        <section
            className="fixed inset-0 bg-[rgba(0,0,0,0.3)]"
            onClick={() => setShowBurger(prev => !prev)}
        ></section>
        : null}

        <section
            className={cn('fixed flex flex-col p-6 top-0 z-100 bg-background w-11/12 min-h-dvh transition-transform duration-300 ease-in-out', 
                showBurger ? "translate-x-0" : "translate-x-[-100%]"
            )}
        >
            <div className='flex justify-end'>
                <button className='cursor-pointer' onClick={() => setShowBurger(false)}>
                    <X />
                </button>
            </div>
            <div className='flex flex-col gap-2'>
                {navLinks.map(el => (
                    <Link key={el.href} className='font-semibold border-b-2 border-[--border] pb-2' href={el.href}>
                        {el.label}
                    </Link>
                ))}
                <ModeToggle />
            </div>
        </section>
      
    </section>
  )
}
