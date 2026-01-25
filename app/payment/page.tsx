'use client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Result | Fullstack Mentor',
  description: 'Payment processing result page',
  robots: { index: false, follow: false },
}

import { useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function PaymentResultPage() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  if (type === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <CheckCircle2 className="text-green-500 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold mb-2">გადახდა წარმატებით დასრულდა!</h1>
        <p className="text-lg">გთხოვთ, შეამოწმოთ თქვენი ელფოსტა (Gmail) დისკორდის ბმულისთვის.</p>
      </div>
    )
  }

  if (type === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <XCircle className="text-red-500 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold mb-2">გადახდა ვერ შესრულდა</h1>
        <p className="text-lg">კურსის შეძენა ვერ მოხერხდა. გთხოვთ, სცადეთ თავიდან ან დაუკავშირდით მხარდაჭერას.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-2">უცნობი სტატუსი</h1>
      <p className="text-lg">გთხოვთ, სცადეთ თავიდან.</p>
    </div>
  )
}