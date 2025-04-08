import { axiosInstance } from "@/lib/axios-instance"
import { Feedback } from "@/types"


export const getAllFeedbacks = async (url: string = 'feedbacks', query?: string): Promise<Feedback[]> => {
    if(query) url = `${url}?${query}`
    const resp = await axiosInstance.get(url)
    return resp.data
}


