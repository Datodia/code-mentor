'use client'
import { ChartAreaDefault } from '@/components/ui/area-chart';
import PaymentGrid from '@/components/ui/payment-grid';
import { SimplePieChart } from '@/components/ui/pie-chart'
import { axiosInstance } from '@/lib/axios-instance';
import { TransactionChartData } from '@/types';
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
    }[],
    transactions: TransactionChartData[]
}

export default function Dashboard() {
    const [statistics, setStatistics] = useState<StatisticsType | null>(null)

    const [usersData, setUsersData] = useState<{ name: string; value: number; }[]>([])
    const [blogsData, setBlogsData] = useState<{ name: string; value: number; }[]>([])
    const [feedbackData, setFeedbackData] = useState<{ name: string; value: number; }[]>([])
    const [trasactionData, setTransactionData] = useState<TransactionChartData | null>(null)

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
        if (!statistics) return;

        setUsersData([
            { name: 'Active Users', value: statistics.users.activeUsers },
            { name: 'Inactive Users', value: statistics.users.inactiveUsers }
        ])

        setBlogsData([
            { name: 'Blogs', value: statistics.blogs.total }
        ])

        setFeedbackData(statistics.feedback.map(feedback => ({
            name: `${feedback._id.toString()} Start`,
            value: feedback.count
        })))
        
        setTransactionData(statistics.transactions[0])
    }, [statistics]);

    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-3'>

                <div className='w-full'>
                    <SimplePieChart
                        data={usersData}
                        title='Users'
                        donut={true}
                        showLabels={false}
                        key={new Date().getMilliseconds()}
                    />
                </div>

                <div className='w-full'>
                    <SimplePieChart
                        data={blogsData}
                        title='Blogs'
                        donut={true}
                        showLabels={false}
                        key={new Date().getMilliseconds()}
                    />
                </div>

                <div className='w-full'>
                    <SimplePieChart
                        data={feedbackData}
                        title='Feedback'
                        donut={true}
                        showLabels={false}
                        key={new Date().getMilliseconds()}
                    />
                </div>
            </div>
            <PaymentGrid 
                total={trasactionData?.totalIncome} 
                blocked={trasactionData?.blocked}
                captured={trasactionData?.captured}    
            />
            <div>
                <ChartAreaDefault chartData={trasactionData?.chartData || []} />
            </div>
        </div>
    )
}
