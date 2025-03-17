'use client'
import { SimplePieChart } from '@/components/ui/pie-chart'
import { axiosInstance } from '@/lib/axios-instance';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

type StatisticsType = {
    users: {
        activeUsers: number;
        inactiveUsers: number;
        total: number;
    },
    blogs: {
        total: number;
    },
    feedback: {
        _id: number;
        count: number;
    }[]
}
    
export default function Dashboard() {
    const [statistics, setStatistics] = useState<StatisticsType | null>(null)

    const [usersData, setUsersData] = useState<{ name: string; value: number; }[]>([])
    const [blogsData, setBlogsData] = useState<{ name: string; value: number; }[]>([])
    const [feedbackData, setFeedbackData] = useState<{ name: string; value: number; }[]>([])

    const getStatistics = async (token: string) => {
        const resp = await axiosInstance.get('/dashboard/statistics', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setStatistics(resp.data)
    }
    useEffect(() => {
        const token = getCookie('accessToken')
        getStatistics(token as string)
    }, [])

    useEffect(() => {
        if(!statistics) return;
        
        setUsersData([
            { name: 'Active Users', value: statistics.users.activeUsers},
            { name: 'Inactive Users', value: statistics.users.inactiveUsers }
        ])

        setBlogsData([
            { name: 'Blogs', value: statistics.blogs.total }
        ])

        setFeedbackData(statistics.feedback.map(feedback => ({
            name: `${feedback._id.toString()} Start`,
            value: feedback.count
        })))
    }, [statistics]);


    return (
        <div className='w-full grid grid-cols-3 gap-3'>
            <div className='w-full bg-secondary'>
                <SimplePieChart
                    data={usersData}
                    title='Users'
                    donut={true}
                    showLabels={false}
                    key={new Date().getMilliseconds()}
                />
            </div>

            <div className='w-full bg-secondary'>
                <SimplePieChart
                    data={blogsData}
                    title='Blogs'
                    donut={true}
                    showLabels={false}
                    key={new Date().getMilliseconds()}
                />
            </div>

            <div className='w-full bg-secondary'>
                <SimplePieChart
                    data={feedbackData}
                    title='Feedback'
                    donut={true}
                    showLabels={false}
                    key={new Date().getMilliseconds()}
                />
            </div>
        </div>
    )
}
