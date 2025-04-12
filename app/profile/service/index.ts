import { axiosInstance } from "@/lib/axios-instance"


export const changeEmailNotify = async (isEmailNotificationEnable: boolean | undefined, token: string) => {
    const resp = await axiosInstance.patch(`/users`, {
        isEmailNotificationEnable,
        headers: { Authorization: `Bearer ${token}` },
    })
    return resp
}