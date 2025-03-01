'use client'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Burger from './Burger'

export default function Header() {
    const [showBurger, setShowBurger] = useState(false)
    return (
        <>
        <Burger showBurger={showBurger} setShowBurger={setShowBurger} />
            <div className={cn(' border-2 border-black mx-auto flex justify-between px-2')}>
                <h2>logo</h2>
                <button className='cursor-pointer' onClick={() => setShowBurger(true)}>
                    <Image
                        src={'/assets/burger.svg'}
                        alt='burger'
                        width={25}
                        height={25}
                    />
                </button>
            </div>
        </>
    )
}
