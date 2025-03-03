'use client'

import { axiosInstance } from "@/lib/axios-instance"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function useAuth() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const getCurrentUser = async (token: string) => {
        try{
            setLoading(true)
            const resp = await axiosInstance.get('/auth/current-user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUser(resp.data)
        }catch(e){
            router.push('/auth/sign-in')
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(() => {
        const accessToken = getCookie('accessToken')

        if(!accessToken){
            router.push('/auth/sign-in')
            return 
        }

       getCurrentUser(accessToken as string)
    }, [])
    
    return {user, loading}
}
