import { axiosInstance } from "@/lib/axios-instance"
import { BlogResponse } from "@/types"


export const getBlogs = async (url: string = '/blogs'): Promise<BlogResponse> => {
    const resp = await axiosInstance.get(url)
    return resp.data
}

export const getBlogById = async (id: string) => {
    const resp = await axiosInstance.get(`/blogs/${id}`)
    return resp.data
}