import { axiosInstance } from "@/lib/axios-instance"
import { Course } from "@/types"


export const getAllCourses = async (url: string, query?: string): Promise<Course[]> => {
    if(query) url = `${url}?${query}`
    const resp = await axiosInstance.get(url)
    return resp.data
}


export const getCourseById =async (id: string): Promise<Course> => {
    const resp = await axiosInstance.get(`/courses/${id}`)
    return resp.data
}