'use client'
import useUserStore from '@/store/user.store';
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
    },
    {
      href: '/dashboard/users',
      label: 'Users'
    },
  ]
  return (
    <div className='w-full flex'>
      <div className='w-[250px] fixed h-screen top-0 z-50 bg-muted-foreground p-4'>
        <div className='flex flex-col gap-2'>
          {
            links.map(el => (
              <Link className='font-medium text-md' key={el.href} href={el.href}>{el.label}</Link>
            ))
          }
        </div>
      </div>
      <div className='pl-[250px] flex-1'>
        {children}
      </div>
    </div>
  )
}
