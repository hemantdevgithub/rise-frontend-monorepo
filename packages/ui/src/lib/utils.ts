import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export * from "tailwind-merge";
export { ClassValue, clsx, twMerge };
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
