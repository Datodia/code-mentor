import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'მომსახურების პირობები | Terms of Service | Fullstack Mentor',
  description:
    'გაეცანი Fullstack Mentor-ის მომსახურების პირობებს: ციფრული კურსების შეძენა, ფასები ლარში (₾), თანხის დაბრუნების წესები და საკონტაქტო ინფორმაცია. Read our Terms of Service for purchases, refunds, and support.',
  keywords: [
    'Fullstack Mentor',
    'მომსახურების პირობები',
    'Terms of Service',
    'Refund Policy',
    'თანხის დაბრუნება',
    'კურსების შეძენა',
    'გადახდა',
    'ფასები ლარში',
    'VISA',
    'Mastercard',
    'Flitt payment',
    'პროგრამირების კურსები საქართველოში',
    'Online courses Georgia',
  ],
  alternates: { canonical: 'https://www.fullstackmentor.space/terms' },
  openGraph: {
    title: 'მომსახურების პირობები | Fullstack Mentor',
    description:
      'Fullstack Mentor-ის მომსახურების პირობები: ციფრული კურსების შეძენა, ფასები ლარში (₾), თანხის დაბრუნების წესები და საკონტაქტო ინფორმაცია.',
    url: 'https://www.fullstackmentor.space/terms',
    siteName: 'Fullstack Mentor',
    type: 'website',
    images: [
      {
        url: 'https://www.fullstackmentor.space/logo_light.png',
        width: 1200,
        height: 630,
        alt: 'Fullstack Mentor - Terms of Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'მომსახურების პირობები | Fullstack Mentor',
    description:
      'Read Fullstack Mentor Terms: purchases, pricing in GEL (₾), refunds, and support contact.',
    creator: '@Datodiasamidz10',
    images: ['https://www.fullstackmentor.space/logo_light.png'],
  },
}

const SELLER = {
  fullName: 'დათო დიასამიძე',
  phone: '+995 598 24 24 22',
  email: 'dato.diasamidze.02@gmail.com',
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">მომსახურების პირობები</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">გამყიდველის ინფორმაცია</h2>
        <ul className="list-disc pl-5">
          <li>გამყიდველი: {SELLER.fullName} (ინდივიდუალური მეწარმე)</li>
          <li>ტელეფონი: {SELLER.phone}</li>
          <li>მეილი: {SELLER.email}</li>
        </ul>
        <p className="text-sm opacity-80">
          დამატებითი საკონტაქტო ინფორმაცია იხილეთ გვერდზე: <Link className="underline" href="/contact">კონტაქტი</Link>
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">სერვისი</h2>
        <p>
          ვებგვერდზე განთავსებულია ციფრული პროდუქტები/კურსები. გადახდის შემდეგ მომხმარებელი იღებს
          წვდომას შეძენილ კონტენტზე.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">ფასები</h2>
        <p>ყველა ფასი მითითებულია ლარში (₾).</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">თანხის დაბრუნება / გაუქმება</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>გადახდის შემდეგ, წვდომის გააქტიურების/კონტენტის გახსნის შემთხვევაში, თანხის დაბრუნება არ ხდება.</li>
          <li>თუ წვდომა ვერ მიიღეთ ტექნიკური ხარვეზის გამო, მოგვწერეთ {SELLER.email} და მოვაგვარებთ პრობლემას ან განვიხილავთ დაბრუნებას.</li>
          <li>მოთხოვნის ვადა: 7 კალენდარული დღე შეძენიდან.</li>
          <li>დაბრუნება ხდება იმავე გადახდის მეთოდით, რომლითაც მოხდა გადახდა.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">დავები</h2>
        <p>დავის შემთხვევაში დაგვიკავშირდით ელ-ფოსტით ან ტელეფონით და ვეცდებით სწრაფად მოგიგვაროთ.</p>
      </section>

      <p className="text-sm opacity-70">ბოლო განახლება: {new Date().toLocaleDateString('ka-GE')}</p>
    </main>
  )
}
