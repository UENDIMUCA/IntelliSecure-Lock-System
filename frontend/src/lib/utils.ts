import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {LoggedUser} from "@/lib/types.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLoggedUser(): LoggedUser | null {
  const user = localStorage.getItem("user");
  if (user){
    return JSON.parse(user);
  }
  return null;
}

export function isLogged(): boolean {
  return getLoggedUser() !== null;
}

export function isAdmin(): boolean {
  const user: LoggedUser | null = getLoggedUser();
  if (user){
    return user.isAdmin;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}