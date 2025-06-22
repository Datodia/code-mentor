'use client';

import { useEffect } from 'react';

export const Hotjar = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;

    const h = window as any;
    h.hj =
      h.hj ||
      function (...args: any[]) {
        (h.hj.q = h.hj.q || []).push(args);
      };

    h._hjSettings = { hjid: process.env.NEXT_PUBLIC_HOTJAR_KEY, hjsv: 6 };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://static.hotjar.com/c/hotjar-${h._hjSettings.hjid}.js?sv=${h._hjSettings.hjsv}`;

    document.head.appendChild(script);
  }, []);

  return null;
};
