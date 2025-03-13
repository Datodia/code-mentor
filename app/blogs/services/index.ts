import { axiosInstance } from "@/lib/axios-instance"
import { BlogResponse } from "@/types"


export const getAllBlogs = async (url: string = '/blogs', query?: string): Promise<BlogResponse> => {
    if(query) {
        url = `${url}?${query}`
    }
    const resp = await axiosInstance.get(url)
    return resp.data
}

export const getBlogById = async (id: string) => {
    const resp = await axiosInstance.get(`/blogs/${id}`)
    return resp.data
}