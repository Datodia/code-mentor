'use client'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
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
import { useTheme } from 'next-themes'

export default function Header() {
    const { user, removeUser } = useUserStore()
    const pathname = usePathname()
    const [showBurger, setShowBurger] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const router = useRouter()
    const { theme, systemTheme } = useTheme()

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const logoSrc = mounted && currentTheme === 'light' ? '/logo_light.png' : '/logo.png';

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
            <div className='sticky top-0 z-20 backdrop-blur-lg w-full bg-background/20 shadow-xs'>
                <header className={cn(' mx-auto flex justify-between items-center px-4 py-2 max-w-[1240px] md:px-4 md:py-4 xl:px-0 ')}>
                    <Link href={'/'}>
                        <Image
                            src={mounted ? logoSrc : '/logo.png'}
                            alt='coding is power'
                            width={70}
                            height={30}
                            priority
                            loading="eager"
                        />
                    </Link>
                    <ul className='hidden gap-5 md:flex '>
                        {navLinks.map(el => (
                            <li key={el.href} className={cn('pb-2 border-b-2 border-transparent hover:border-chart-4', pathname.startsWith(el.href) ? 'border-chart-4' : null)}>
                                <Link className={cn('font-medium text-primary text-md ', pathname.startsWith(el.href) ? 'font-bold' : null)} href={el.href}>{el.label}</Link>
                            </li>
                        ))}
                    </ul>
                    <div className='flex gap-2 items-center'>
                        <div className='relative right-4 md:right-0'>
                            <Button onClick={() => setShowProfileModal(prev => !prev)} variant={'ghost'} className='p-1 cursor-pointer' >
                                {
                                    user?.avatar ?
                                        <Image src={user.avatar} alt={user.firstName} width={32} height={32} className='rounded-full' /> :
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
                                                    <Link onClick={() => setShowProfileModal(false)} href={'/profile'}>პროფილი</Link>
                                                    <Button onClick={() => {
                                                        handleLogOut()
                                                        setShowProfileModal(false)
                                                    }} className='cursor-pointer'>გასვლა</Button>
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
                </header>
            </div>
        </>
    )
}
