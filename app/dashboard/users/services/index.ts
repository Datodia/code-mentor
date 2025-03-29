import { axiosInstance } from "@/lib/axios-instance"
import { User, UserResponse } from "@/types"


export const getAllUsers = async (url: string = '/users', headers: any,  query?: string): Promise<UserResponse> => {
    if(query) {
        url = `${url}?${query}`
    }

    const resp = await axiosInstance.get(url, {headers})
    return resp.data
}



export const getUserById = async (id: string): Promise<User> => {
    const resp = await axiosInstance.get(`/users/${id}`)
    return resp.data
}