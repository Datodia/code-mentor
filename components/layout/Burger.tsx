import { cn } from '@/lib/utils'
import React from 'react'
type BurgerPros = {
    setShowBurger: React.Dispatch<React.SetStateAction<boolean>>,
    showBurger: boolean
}

export default function Burger({setShowBurger, showBurger}:BurgerPros) {
  return (
    <section>
        {showBurger ? 
        <section
            className="fixed inset-0 bg-[rgba(0,0,0,0.3)]"
            onClick={() => setShowBurger(prev => !prev)}
        ></section>
        : null}

        <section
            className={cn('fixed flex flex-col justify-between p-6 top-0 z-10 bg-white w-11/12 min-h-dvh transition-transform duration-300 ease-in-out', 
                showBurger ? "translate-x-0" : "translate-x-[-100%]"
            )}
        >
            burget content
        </section>
      
    </section>
  )
}
