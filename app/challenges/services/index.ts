import { axiosInstance } from "@/lib/axios-instance"
import { Challenge, ChallengeResponse } from "@/types"


export const getAllChallenges = async (url: string = '/challenges', query?: string): Promise<ChallengeResponse> => {
    if(query) {
        url = `${url}?${query}`
    }
    const resp = await axiosInstance.get(url)
    return resp.data
}

export const getChallengeById = async (id: string): Promise<Challenge> => {
    const resp = await axiosInstance.get(`/challenges/${id}`)
    return resp.data
}