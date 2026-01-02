"use client";

import { cn } from "@/lib/utils";
import { Copyright, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="relative mt-20 w-full overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#accaff_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
          "opacity-70"
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-background" />

      <div className="relative z-20 border-t">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Fullstack Mentor</h3>
              <p className="text-sm opacity-80">
                პროგრამირების კურსები საქართველოში — ვებ დეველოპმენტი, Backend,
                Fullstack.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              <Link
                href="https://github.com/datodia"
                target="_blank"
                className="inline-flex items-center gap-2 opacity-90 hover:underline transition"
              >
                <Github className="w-4 h-4" />
                Github
              </Link>

              <Link
                href="https://www.linkedin.com/in/dato-diasamidze-310a73230/"
                target="_blank"
                className="inline-flex items-center gap-2 opacity-90 hover:underline transition"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Link>

              <a
                href="mailto:dato.diasamidze.02@gmail.com"
                className="inline-flex items-center gap-2 opacity-90 hover:underline transition"
              >
                <Mail className="w-4 h-4" />
                dato.diasamidze.02@gmail.com
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm opacity-80">
              <Link href="/terms" className="hover:underline transition">
                მომსახურების პირობები
              </Link>
              <span className="opacity-40">•</span>
              <Link href="/privacy" className="hover:underline transition">
                კონფიდენციალურობის პოლიტიკა
              </Link>
              <span className="opacity-40">•</span>
              <Link href="/contact" className="hover:underline transition">
                კონტაქტი
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Image
                className="rounded-xl"
                src="/assets/visa.png"
                alt="VISA"
                width={54}
                height={18}
              />
              <Image
                className="rounded-xl"
                src="/assets/mastercard.png"
                alt="Mastercard"
                width={54}
                height={18}
              />
            </div>

            <div className="flex items-center justify-center gap-2 text-sm opacity-70">
              <Copyright className="w-4 h-4" />
              <span>{new Date().getFullYear()}</span>
              <span>ყველა უფლება დაცულია</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
