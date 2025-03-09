'use client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useAuth from '@/hooks/useAuth'
import useUserStore from '@/store/user.store'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Profile() {
  const { user } = useAuth()
  const router = useRouter()
  const removeUser = useUserStore(state => state.removeUser)
  if (!user) return null

  const handleLogOut = () => {
    deleteCookie('accessToken')
    removeUser()
    router.push('/')
  }

  return (
    <div className='px-4 py-2 max-w-[1240px] mx-auto md:px-4 md:py-4 lg:px-0'>
      <h1>Profile</h1>
      <h2>{user.email}</h2>
      <Button onClick={handleLogOut}>Log out</Button>
      <Tabs defaultValue='account' className='w-full'>
        <TabsList>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='feedback'>Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="feedback">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}
