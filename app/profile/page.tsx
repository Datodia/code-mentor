'use client'
import useAuth from '@/hooks/useAuth'
import React from 'react'

export default function Profile() {
  const { user, loading} = useAuth()

  if(!user) return null

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}
