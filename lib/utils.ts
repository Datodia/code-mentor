import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return ` ${date.getDate()} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()} `;
}