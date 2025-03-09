import { axiosInstance } from "@/lib/axios-instance"
import useUserStore from "@/store/user.store"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function useAuth(isAdmin?:boolean) {
    const router = useRouter()
    const user = useUserStore(state => state.user)
    const setUser = useUserStore(state => state.setUser)
    const [loading, setLoading] = useState(false)

    const getCurrentUser = async (token: string) => {
        try {
            setLoading(true)
            const resp = await axiosInstance.get('/auth/current-user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUser(resp.data)
        } catch (e) {
            router.push(isAdmin ? '/auth/sign-in/admin' : '/auth/sign-in')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user) return
        const accessToken = getCookie('accessToken')

        if (!accessToken) {
            router.push(isAdmin ? '/auth/sign-in/admin' : '/auth/sign-in')
            return
        }

        getCurrentUser(accessToken as string)
    }, [])

    return { user, loading }
}
