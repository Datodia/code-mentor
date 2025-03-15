'use client'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Burger from './Burger'
import { Menu, User } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '../ui/mode-toggle'
import { usePathname, useRouter } from 'next/navigation'
import useUserStore from '@/store/user.store'
import { Role } from '@/enums/role.enum'
import { deleteCookie } from 'cookies-next'

export default function Header() {
    const { user, removeUser } = useUserStore()
    const pathname = usePathname()
    const [showBurger, setShowBurger] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const router = useRouter()
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
    if (user?.role === Role.ADMIN) {
        navLinks.push({
            label: 'დეშბორდი',
            href: '/dashboard'
        })
    }


    const handleLogOut = () => {
        deleteCookie('accessToken')
        removeUser()
        router.push('/')
    }
    return (
        <>
            <Burger navLinks={navLinks} showBurger={showBurger} setShowBurger={setShowBurger} />
            <div className={cn(' mx-auto flex justify-between px-4 py-2 max-w-[1240px] md:px-4 md:py-4 xl:px-0')}>
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
                    <div className='relative'>
                        <Button onClick={() => setShowProfileModal(prev => !prev)} variant={'ghost'} className='p-1 cursor-pointer' >
                            {
                                user?.email ?
                                    <span className='size-8 text-sm bg-foreground custom-border rounded-full flex items-center justify-center uppercase'>{`${user.firstName[0]}${user.lastName[0]}`}</span> :
                                    <User className='md:size-5' />
                            }
                        </Button>
                        {
                            showProfileModal ?
                                <div
                                    className='absolute left-1/2 transform -translate-x-1/2  top-10 bg-background shadow-lg p-4 z-20 rounded-xl flex flex-col gap-2 lg:p-6 lg:gap-4'
                                    onMouseLeave={() => setShowProfileModal(false)}
                                >
                                    {
                                        user?._id ?
                                            <>
                                                <Link href={'/profile'}>პროფილი</Link>
                                                <Button onClick={handleLogOut} className='cursor-pointer'>გასვლა</Button>
                                            </>
                                            :
                                            <Button onClick={() => router.push('/auth/sign-in')} className='cursor-pointer'>შესვლა</Button>
                                    }
                                </div> : null
                        }
                    </div>

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
