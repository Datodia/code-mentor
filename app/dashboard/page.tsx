'use client'
import { SimplePieChart } from '@/components/ui/pie-chart'
import React, { useEffect, useState } from 'react'

const data = [
    { name: "Chrome", value: 675 },
    { name: "Safari", value: 410 },
    { name: "Firefox", value: 287 },
    { name: "Edge", value: 173 },
    { name: "Other", value: 90 },
    { name: "Other", value: 90 },
  ];

export default function Dashboard() {
    return (
        <div className='w-full'>
            <div className=' bg-secondary'>
                <h1>dashboard</h1>
                <SimplePieChart
                    data={data}
                    title='gela'
                    donut={true}
                    showLabels={false}
                />
            </div>
        </div>
    )
}
