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
  metadataBase: new URL("https://fullstackmentor.space"),
  robots: { index: true, follow: true },

  title: {
    default: "პროგრამირების კურსები საქართველოში | Fullstack Mentor",
    template: "%s | Fullstack Mentor",
  },
  description:
    "პროგრამირების კურსები საქართველოში: ფრონტენდ, ბექენდ და ფულსტეკ კურსები. ისწავლე JavaScript, React, Node.js, NestJS, Express და მონაცემთა ბაზები რეალური პროექტებით.",

  alternates: { canonical: "/" },

  keywords: [
    "პროგრამირების კურსები",
    "პროგრამირების კურსები საქართველოში",
    "პროგრამირება",
    "ფრონტენდ კურსები",
    "ბექენდ კურსები",
    "ფულსტეკ კურსები",
    "ვებ დეველოპმენტი",
    "JavaScript კურსი",
    "React კურსი",
    "Node.js კურსი",
    "NestJS კურსი",
    "ExpressJS კურსი",
    "TypeScript კურსი",
    "მონაცემთა ბაზები",
    "MongoDB",
    "PostgreSQL",
    "დეველოპერული კურსები",
    "ტექ ბლოგები",
    "კოდირების გამოწვევები",
    "მენტორობა",

    "Programming courses Georgia",
    "Fullstack course",
    "Backend course",
    "Frontend course",
    "JavaScript course",
    "Node.js course",
    "React course",
    "NestJS course",
    "Express.js course",
    "Databases",
    "Tech blogs",
  ],

  verification: {
    google: "D9H1qVq2hFgfR9ksUVDXnMuRIgNTTtZoYkAtwbfi-8Y",
  },

  openGraph: {
    title: "პროგრამირების კურსები საქართველოში | Fullstack Mentor",
    description:
      "ისწავლე პროგრამირება: ფრონტენდ, ბექენდ და ფულსტეკ კურსები, მენტორობა, პროექტები და ტექნოლოგიური ბლოგები.",
    url: "/",
    siteName: "Fullstack Mentor",
    type: "website",
    images: [
      {
        url: "/logo_light.png",
        width: 1200,
        height: 630,
        alt: "Fullstack Mentor",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "პროგრამირების კურსები საქართველოში | Fullstack Mentor",
    description:
      "Frontend/Backend/Fullstack კურსები, მენტორობა, პროექტები და ტექნოლოგიური ბლოგები.",
    creator: "@Datodiasamidze10",
    images: ["/logo_light.png"],
  },
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
          <ThemeProvider attribute={'class'} defaultTheme="light" enableSystem disableTransitionOnChange>
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
