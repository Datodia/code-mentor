import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/layout/footer";
import ThemeProvider from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

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
  title: "Fullstack Mentor | Start Your Tech Career",
  description:
    "Kickstart your tech career with expert mentorship, full-stack development courses, tech blogs, and career guidance. Learn front-end and back-end development with industry experts.",
  keywords: [
    "Tech Career",
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Programming Courses",
    "Learn to Code",
    "Full Stack Mentor",
    "Fullstack Mentor",
    "Web Development",
    "Software Engineering",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Career in Tech",
    "Nestjs",
    "AWS",
    "GraphQL",
    "TypeScript",
    "Docker",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "კურსები",
    "პროგრამირების კურსები",
    "ტექნოლოგიები",
    "პროგრამირება",
    "ტექ კარიერა",
    "ტექ კარიერა საქართველოში",
    "ფულსტეკ დეველოპერი",
    "ფულსტეკ დეველოპერი საქართველოში",
  ],
  verification: {
    google: "D9H1qVq2hFgfR9ksUVDXnMuRIgNTTtZoYkAtwbfi-8Y"
  },
  openGraph: {
    title: "Fullstack Mentor | Start Your Tech Career",
    description:
      "Kickstart your tech career with expert mentorship, full-stack development courses, tech blogs, and career guidance. Learn front-end and back-end development with industry experts.",
    url: "https://fullstackmentor.space",
    siteName: "Fullstack Mentor",
    type: "website",
    images: [
      {
        url: "/logo_light.png",
        width: 800,
        height: 600,
        alt: "Fullstack Mentor Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Mentor | Start Your Tech Career",
    description:
      "Kickstart your tech career with expert mentorship, full-stack development courses, tech blogs, and career guidance. Learn front-end and back-end development with industry experts.",
    creator: "@Datodiasamidz10"
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
      </body>
    </html>
  );
}
