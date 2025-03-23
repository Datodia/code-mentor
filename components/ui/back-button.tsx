import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import { ChevronLeftIcon } from 'lucide-react'

export default function BackButton({href}: {href: string}) {
  return (
    <Link href={href} className="flex items-end gap-2 bg-foreground pr-3 mb-2 text-background p-2 rounded-md w-max">
        <ChevronLeftIcon className='w-4' />
        უკან
    </Link>
  )
}
