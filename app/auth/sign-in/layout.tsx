import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Fullstack Mentor',
  description: 'Sign in to your Fullstack Mentor account to access courses, challenges, and track your progress.',
  robots: { index: false, follow: false },
}

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return children
}
