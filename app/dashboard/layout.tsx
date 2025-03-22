'use client'
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import React from 'react'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth(true)

    if (!user) {
        return null
    }

  const links = [
    {
      href: '/dashboard',
      label: 'Home'
    },
    {
      href: '/dashboard/blogs',
      label: 'Blogs'
    },
    {
      href: '/dashboard/courses',
      label: 'Courses'
    },
    {
      href: '/dashboard/challenges',
      label: 'Challenges'
    }
  ]
  return (
    <div className='w-full flex'>
      <div className='w-[300px] fixed h-screen bg-muted-foreground p-4'>
        <div className='flex flex-col gap-2'>
          {
            links.map(el => (
              <Link className='font-medium' key={el.href} href={el.href}>{el.label}</Link>
            ))
          }
        </div>
      </div>
      <div className='pl-[300px] flex-1'>
        {children}
      </div>
    </div>
  )
}
