import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/layout/footer";
import ThemeProvider from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "ისწავლე პროგრამირება | Start Your Tech Career with Fullstack Mentor",
  description:
    "ისწავლე ფრონტენდ და ბექენდ დეველოპმენტი პროფესიონალ მენტორებთან. Explore full-stack development courses, coding challenges, tech blogs, and career advice to launch your career in tech.",
  keywords: [
    "Tech Career", "Full Stack Development", "Frontend Development", "Backend Development",
    "Programming Courses", "Learn to Code", "Web Development", "Fullstack Mentor",
    "Software Engineering", "JavaScript", "React", "Next.js", "Node.js", "NestJS",
    "GraphQL", "TypeScript", "Docker", "AWS", "Express", "MongoDB", "PostgreSQL",
    "Coding Challenges", "Tech Blogs", "Developer Mentorship", "Full stack mentor",

    "ტექ კარიერა", "პროგრამირების კურსები", "ფრონტენდ კურსი", "ბექენდ კურსი", "ფულსტეკ დეველოპმენტი",
    "სწავლა კოდირებით", "პროგრამირება", "ტექნოლოგიები", "დეველოპერული კურსები", "პროგრამისტის კარიერა",
    "ფულსტეკ დეველოპერი", "ფულსტეკ დეველოპერი საქართველოში", "გამოწვევები პროგრამირებაში",
    "ტექ ბლოგები", "მენტორობა დეველოპერებისთვის"
  ],
  verification: {
    google: "D9H1qVq2hFgfR9ksUVDXnMuRIgNTTtZoYkAtwbfi-8Y"
  },
  openGraph: {
    title: "ისწავლე პროგრამირება | Start Your Tech Career with Fullstack Mentor",
    description:
      "Unlock your career in tech with full-stack development courses, mentorship, coding challenges, and in-depth tech blogs. Ideal for beginners and future developers in Georgia and beyond.",
    url: "https://fullstackmentor.space",
    siteName: "Fullstack Mentor",
    type: "website",
    images: [
      {
        url: "https://www.fullstackmentor.space/logo_light.png",
        width: 1200,
        height: 630,
        alt: "Fullstack Mentor Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Your Tech Career | Fullstack Mentor",
    description:
      "Learn to code with expert mentorship, real-world projects, and comprehensive full-stack development resources. Study frontend, backend, and more.",
    creator: "@Datodiasamidz10",
    images: ["https://www.fullstackmentor.space/logo_light.png"]
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider attribute={'class'} defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <main className="min-h-[calc(100vh_-_260px)]">
              {children}
            </main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
