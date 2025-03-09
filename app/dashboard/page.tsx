'use client'
import { Role } from '@/enums/role.enum'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Dashboard() {
    const { user } = useAuth(true)
    const router = useRouter()
    if (!user || user.role !== Role.ADMIN) {
        router.push('/auth/sign-in/admin')
    }
    return (
        <div>
            dashboard2
        </div>  
    )
}
