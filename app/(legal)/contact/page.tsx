import type { Metadata } from 'next'
import { Phone, Mail, Github, Linkedin } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'კონტაქტი | Contact | Fullstack Mentor',
  description:
    'დაგვიკავშირდი Fullstack Mentor-ზე: ტელეფონი, ელ-ფოსტა და საკონტაქტო არხები. Contact us for support, payments, and course access.',
  keywords: [
    'Fullstack Mentor',
    'კონტაქტი',
    'Contact',
    'მხარდაჭერა',
    'გადახდა',
    'Flitt',
    'VISA',
    'Mastercard',
    'პროგრამირების კურსები საქართველოში',
    'კურსები',
  ],
  alternates: { canonical: 'https://www.fullstackmentor.space/contact' },
  openGraph: {
    title: 'კონტაქტი | Fullstack Mentor',
    description: 'Fullstack Mentor საკონტაქტო ინფორმაცია: ტელეფონი, ელ-ფოსტა და საკონტაქტო არხები.',
    url: 'https://www.fullstackmentor.space/contact',
    siteName: 'Fullstack Mentor',
    type: 'website',
    images: [
      {
        url: 'https://www.fullstackmentor.space/logo_light.png',
        width: 1200,
        height: 630,
        alt: 'Fullstack Mentor - Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'კონტაქტი | Fullstack Mentor',
    description: 'Contact Fullstack Mentor: phone, email, and links.',
    creator: '@Datodiasamidz10',
    images: ['https://www.fullstackmentor.space/logo_light.png'],
  },
}

const CONTACT = {
  phone: '+995 598 24 24 22',
  email: 'dato.diasamidze.02@gmail.com',
  github: 'https://github.com/datodia',
  linkedin: 'https://www.linkedin.com/in/dato-diasamidze-310a73230/',
}

export default function ContactPage() {
  const tel = `tel:${CONTACT.phone.replace(/\s/g, '')}`
  const mailto = `mailto:${CONTACT.email}`

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">კონტაქტი</h1>

      <p className="opacity-90">
        კითხვების ან გადახდასთან დაკავშირებული საკითხების შემთხვევაში დამიკავშირდი ქვემოთ მოცემული არხებით.
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 opacity-80" />
          <a className="underline underline-offset-4" href={tel}>
            {CONTACT.phone}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 opacity-80" />
          <a className="underline underline-offset-4" href={mailto}>
            {CONTACT.email}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Github className="w-4 h-4 opacity-80" />
          <Link className="underline underline-offset-4" href={CONTACT.github} target="_blank">
            Github
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Linkedin className="w-4 h-4 opacity-80" />
          <Link className="underline underline-offset-4" href={CONTACT.linkedin} target="_blank">
            LinkedIn
          </Link>
        </div>
      </div>

      <p className="text-sm opacity-70">
        სამუშაო საათები: ორშაბათი–პარასკევი, 10:00–18:00 (თბილისის დრო)
      </p>
    </main>
  )
}
