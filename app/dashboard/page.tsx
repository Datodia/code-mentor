'use client'
import useAuth from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'


export default function Dashboard() {
    const {user} = useAuth(true)

    if(!user){
        return null
    }

    return (
        <div>
            dashboard2
        </div>
    )
}
