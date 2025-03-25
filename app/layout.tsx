import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
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
    type: "website"
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
        <ThemeProvider attribute={'class'} defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="min-h-[calc(100vh_-_260px)]">
            {children}
          </main>
            <Toaster />
            <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
