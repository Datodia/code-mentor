'use client'
import { useState, useEffect } from 'react'

export const useCustomSearchParams = () =>  {
  const [searchParams, setSearchParams] = useState<Record<string, string>>({})
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paramsObject = Object.fromEntries(params.entries())
    setSearchParams(paramsObject)
    
    const handleRouteChange = () => {
      const newParams = new URLSearchParams(window.location.search)
      setSearchParams(Object.fromEntries(newParams.entries()))
    }
    
    window.addEventListener('popstate', handleRouteChange)
    window.addEventListener('pushstate', handleRouteChange)
    window.addEventListener('replacestate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      window.removeEventListener('pushstate', handleRouteChange)
      window.removeEventListener('replacestate', handleRouteChange)
    }
  }, [])
  
  return searchParams
}