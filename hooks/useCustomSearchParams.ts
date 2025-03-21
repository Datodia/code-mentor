'use client'
import { useState, useEffect } from 'react'

export const useCustomSearchParams = () =>  {
  const [searchParams, setSearchParams] = useState({})
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paramsObject = Object.fromEntries(params.entries())
    setSearchParams(paramsObject)
    
    const handleRouteChange = () => {
      const newParams = new URLSearchParams(window.location.search)
      setSearchParams(Object.fromEntries(newParams.entries()))
    }
    
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])
  
  return searchParams
}