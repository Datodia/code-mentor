'use client'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Burger from './Burger'
import { Menu, User } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '../ui/mode-toggle'
import { usePathname } from 'next/navigation'
import useUserStore from '@/store/user.store'

export default function Header() {
    const user = useUserStore(state => state.user)
    console.log(user, "userrr")
    const pathname = usePathname()
    const [showBurger, setShowBurger] = useState(false)
    const navLinks = [
        {
            label: 'კურსები',
            href: '/courses'
        },
        {
            label: 'ბლოგები',
            href: '/blogs'
        },
        {
            label: 'სტუდენტები',
            href: '/students'
        },
        {
            label: 'გამოწვევები',
            href: '/challenges'
        },
    ]
    return (
        <>
            <Burger navLinks={navLinks} showBurger={showBurger} setShowBurger={setShowBurger} />
            <div className={cn(' mx-auto flex justify-between px-4 py-2 lg:max-w-[1240px] md:px-4 md:py-4 lg:px-0')}>
                <Link href={'/'}>
                    <h2>LOGO</h2>
                </Link>
                <ul className='hidden gap-5 md:flex '>
                    {navLinks.map(el => (
                        <li key={el.href} className={cn('pb-2', pathname.startsWith(el.href) ? 'border-b-2 border-chart-4' : null)}>
                            <Link className={cn('font-medium text-[--primary] text-md', pathname.startsWith(el.href) ? 'font-bold' : null)} href={el.href}>{el.label}</Link>
                        </li>
                    ))}
                </ul>
                <div className='flex gap-2 items-center'>
                    <Link href={'/profile'}>
                        {
                            user?.email ?
                                <span className='size-8 text-sm bg-chart-2 rounded-full flex items-center justify-center uppercase'>{`${user.firstName[0]} ${user.lastName[0]}`}</span> :
                                <User className='md:size-5' />
                        }
                    </Link>
                    <div className='hidden md:block'>
                        <ModeToggle className='md:size-8' />
                    </div>
                </div>
                <button className='cursor-pointer md:hidden' onClick={() => setShowBurger(true)}>
                    <Menu />
                </button>
            </div>
        </>
    )
}
