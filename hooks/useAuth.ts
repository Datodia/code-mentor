'use client'
import { Role } from "@/enums/role.enum"
import { axiosInstance } from "@/lib/axios-instance"
import useUserStore from "@/store/user.store"
import { getCookie } from "cookies-next"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function useAuth(isAdmin?:boolean) {
    const router = useRouter()
    const pathName = usePathname()
    const user = useUserStore(state => state.user)
    const setUser = useUserStore(state => state.setUser)
    const [loading, setLoading] = useState(false)

    const redirectUrls = ['/dashboard', '/profile']
    const isRedirectUrls = redirectUrls.some(url => pathName.startsWith(url))

    const getCurrentUser = async (token: string) => {
        try {
            setLoading(true)
            const resp = await axiosInstance.get('/auth/current-user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(isAdmin && resp.data.role !== Role.ADMIN){
                router.push('/auth/sign-in/admin')
                return
            }
            setUser(resp.data)

        } catch (e) {
            if(isRedirectUrls){
                router.push(isAdmin ? '/auth/sign-in/admin' : '/auth/sign-in')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user) return
        const accessToken = getCookie('accessToken')

        getCurrentUser(accessToken as string)
    }, [])

    return { user, loading }
}
