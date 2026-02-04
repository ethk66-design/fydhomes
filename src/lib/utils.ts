import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string | number | null | undefined): string {
  if (!price) return "Price on Request";

  const priceStr = price.toString().trim();
  if (priceStr.startsWith("₹")) return priceStr;

  return `₹ ${priceStr}`;
}

export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}
