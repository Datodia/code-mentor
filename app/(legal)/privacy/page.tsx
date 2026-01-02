import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'კონფიდენციალურობის პოლიტიკა | Privacy Policy | Fullstack Mentor',
  description:
    'გაეცანი Fullstack Mentor-ის კონფიდენციალურობის პოლიტიკას: რა მონაცემებს ვაგროვებთ, რატომ, როგორ ვინახავთ და ვის ვუზიარებთ (გადახდის პროვაიდერი Flitt). Learn how we process personal data for payments and support.',
  keywords: [
    'Fullstack Mentor',
    'კონფიდენციალურობის პოლიტიკა',
    'Privacy Policy',
    'პერსონალური მონაცემები',
    'მონაცემთა დაცვა',
    'Flitt',
    'გადახდა',
    'VISA',
    'Mastercard',
    'პროგრამირების კურსები საქართველოში',
  ],
  alternates: { canonical: 'https://www.fullstackmentor.space/privacy' },
  openGraph: {
    title: 'კონფიდენციალურობის პოლიტიკა | Fullstack Mentor',
    description:
      'რა მონაცემებს ვაგროვებთ, როგორ ვიყენებთ და ვის ვუზიარებთ. გადახდებს ამუშავებს Flitt და ბარათის მონაცემებს ჩვენ არ ვინახავთ.',
    url: 'https://www.fullstackmentor.space/privacy',
    siteName: 'Fullstack Mentor',
    type: 'website',
    images: [
      {
        url: 'https://www.fullstackmentor.space/logo_light.png',
        width: 1200,
        height: 630,
        alt: 'Fullstack Mentor - Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'კონფიდენციალურობის პოლიტიკა | Fullstack Mentor',
    description:
      'Privacy Policy: what data we collect, how we use it, and payment processing via Flitt.',
    creator: '@Datodiasamidz10',
    images: ['https://www.fullstackmentor.space/logo_light.png'],
  },
}

const SELLER = {
  fullName: 'დათო დიასამიძე',
  email: 'dato.diasamidze.02@gmail.com',
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">კონფიდენციალურობის პოლიტიკა</h1>

      <p className="opacity-90">
        ეს პოლიტიკა აღწერს, როგორ ამუშავებს {SELLER.fullName} მომხმარებლის პერსონალურ მონაცემებს
        ვებგვერდზე სერვისის მიწოდების მიზნით (კურსების შეძენა/წვდომა და მხარდაჭერა).
      </p>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">რა მონაცემებს ვაგროვებთ</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>ელ-ფოსტა (ანგარიშის შექმნა, წვდომა, მხარდაჭერა)</li>
          <li>სახელი/გვარი (თუ საჭიროა ინვოისისთვის ან იდენტიფიკაციისთვის)</li>
          <li>გადახდასთან დაკავშირებული ტექნიკური მონაცემები (ტრანზაქციის იდენტიფიკატორი, სტატუსი და მსგავსი)</li>
          <li>ტექნიკური ჩანაწერები უსაფრთხოებისთვის</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">რა მიზნებისთვის ვიყენებთ</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>კურსებზე წვდომის უზრუნველყოფა და ანგარიშის მართვა</li>
          <li>გადახდის დადასტურება და ტრანზაქციების დამუშავება</li>
          <li>ტექნიკური მხარდაჭერა და მომხმარებელთან კომუნიკაცია</li>
          <li>უსაფრთხოება და თაღლითური აქტივობის პრევენცია</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">მესამე მხარეები</h2>
        <p className="opacity-90">
          გადახდებს ამუშავებს გადახდის პროვაიდერი (Flitt). ბარათის მონაცემებს (ბარათის ნომერი, CVV და სხვა)
          ჩვენ არ ვიღებთ და არ ვინახავთ — ეს მონაცემები მუშავდება მხოლოდ გადახდის პროვაიდერის სისტემაში.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">მონაცემების შენახვა</h2>
        <p className="opacity-90">
          მონაცემებს ვინახავთ მხოლოდ იმ ვადით, რაც საჭიროა სერვისის გასაწევად, კანონიერი ვალდებულებების
          შესასრულებლად და უსაფრთხოების უზრუნველსაყოფად.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">თქვენი უფლებები</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>მოთხოვოთ თქვენს მონაცემებზე წვდომა/გასწორება</li>
          <li>მოთხოვოთ წაშლა, თუ არ არსებობს შენახვის სამართლებრივი საფუძველი</li>
          <li>კითხვების შემთხვევაში დაგვიკავშირდეთ</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">კონტაქტი</h2>
        <p className="opacity-90">მონაცემებთან დაკავშირებით მოგვწერეთ: {SELLER.email}</p>
      </section>

      <p className="text-sm opacity-70">ბოლო განახლება: {new Date().toLocaleDateString('ka-GE')}</p>
    </main>
  )
}
