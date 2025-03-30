import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: Date, locale = 'en-US') {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(locale, options);
}

export function formatDataNumeric(date: Date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
