'use client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useAuth from '@/hooks/useAuth'
import { formatDate } from '@/lib/utils'
import useUserStore from '@/store/user.store'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Profile() {
  const { user } = useAuth()
  const router = useRouter()
  const removeUser = useUserStore(state => state.removeUser)
  if (!user) return null



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
              <li>
                იმეილი: {user.email}
              </li>
              <li>
                სახელი: {user.firstName}
              </li>
              <li>
                გვარი: {user.lastName}
              </li>
              <li>
                ნომერი: {user.phoneNumber}
              </li>
              <li>
                შექმნის თარიღი: {formatDate(user.createdAt)}
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="feedback">
            {
              user.hasFeedbackPermition ?
                <>ფიდებექი</>
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
