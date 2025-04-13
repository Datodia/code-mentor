'use client'
import useUserStore from '@/store/user.store';
import { GraduationCap, House, NotebookPen, Puzzle, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUserStore()

    if (!user) {
        return null
    }

  const links = [
    {
      href: '/dashboard',
      label: 'Home',
      icon: <House />,
    },
    {
      href: '/dashboard/blogs',
      label: 'Blogs',
      icon: <NotebookPen />,
    },
    {
      href: '/dashboard/courses',
      label: 'Courses',
      icon: <GraduationCap />,
    },
    {
      href: '/dashboard/challenges',
      label: 'Challenges',
      icon: <Puzzle />,
    },
    {
      href: '/dashboard/users',
      label: 'Users',
      icon: <Users />,
    },
  ]
  return (
    <div className='w-full flex'>
      <div className='w-[56px] fixed h-[calc(100vh-56px)] mt-[56px] md:h-[calc(100vh - 72px)] md:mt-[72px] top-0 z-10 bg-muted-foreground p-4 lg:w-[200px]'>
        <div className='flex flex-col gap-4'>
          {
            links.map(el => (
              <Link className='font-medium text-md flex gap-2' key={el.href} href={el.href}>{el.icon} <span className='hidden lg:block'>{el.label}</span></Link>
            ))
          }
        </div>
      </div>
      <div className='pl-[56px] flex-1 lg:pl-[200px] w-[50%] md:w-full'>
        {children}
      </div>
    </div>
  )
}
