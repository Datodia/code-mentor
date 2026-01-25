'use client'
import type { Metadata } from 'next'
import AddOrUpdateFeedback from '@/components/layout/add-or-update-feedback'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'
import useUserStore from '@/store/user.store'
import { getCookie } from 'cookies-next'
import React from 'react'
import { axiosInstance } from '@/lib/axios-instance'
import { toast } from 'sonner'

export const metadata: Metadata = {
  title: 'My Profile | Fullstack Mentor',
  description: 'Manage your profile, courses, and account settings on Fullstack Mentor.',
  robots: { index: false, follow: false },
}

export default function Profile() {
  const { user, setUser } = useUserStore()
  const token = getCookie('accessToken')
  if (!user) {
    return null
  }

  const handleChangeEmailNotification = async () => {
    const resp = await axiosInstance.patch(`/users`, {
      isEmailNotificationEnable: !user.isEmailNotificationEnable,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if(resp.status === 200){
      setUser({...user, isEmailNotificationEnable: resp.data.isEmailNotificationEnable})
      toast.success(user.isEmailNotificationEnable ? 'გამოირთო ნოთიფიკაცია' : 'ჩაირთო ნოთიფიკაცია')
    }
  }


  return (
    <div className='px-4 py-2 max-w-[1240px] mx-auto md:px-4 md:py-4 xl:px-0'>
      <h1>Profile</h1>
      <h2>{user.email}</h2>
      <Tabs defaultValue='account' className='w-full mt-10'>
        <TabsList>
          <TabsTrigger value='account'>ინფორმაცია</TabsTrigger>
          <TabsTrigger value='feedback'>დაწერე ფიდბექი</TabsTrigger>
        </TabsList>
        <div className='bg-accent p-4 rounded-md'>

          <TabsContent value="account">
            <ul className='flex flex-col gap-4'>
              <li className='flex items-center gap-2' >
                <Switch onCheckedChange={handleChangeEmailNotification} checked={user.isEmailNotificationEnable} id='email' /> <label htmlFor='email'>Email შეტყობინება</label>
              </li>
              <li>
                ელ.ფოსტა: {user.email}
              </li>
              <li>
                სახელი: {user.firstName}
              </li>
              <li>
                გვარი: {user.lastName}
              </li>
              <li>
                ნომერი: {user.phoneNumber ?? 'არ მოიძებნა'}
              </li>
              <li>
                შექმნის თარიღი: {formatDate(user.createdAt)}
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="feedback">
            {
              user.hasFeedbackPermition ?
                <AddOrUpdateFeedback feedbackId={user.feedback} />
                :
                <div>
                  სამწუხაროდ არ გაქვთ უფლება დაწეროთ ფიდბექი
                </div>
            }
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
