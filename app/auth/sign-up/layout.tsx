import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | Fullstack Mentor',
  description: 'Create a new account on Fullstack Mentor to start learning programming with courses, challenges, and mentorship.',
  robots: { index: false, follow: false },
}

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return children
}
