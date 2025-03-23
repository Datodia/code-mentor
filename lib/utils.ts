import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return ` ${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()} `;
}

export const textTruncate = (text: string, length: number) => {
  return text.length > length ? text.slice(0, length) + '...' : text
}

export const levelMapper = (level: 1 | 2 | 3 | 4 | 5) => {
  switch (level) {
    case 1:
      return 'Beginner';
    case 2:
      return 'Junior';
    case 3:
      return 'Intermediate';
    case 4:
      return 'Advanced';
    case 5:
      return 'Pro';
  }
}