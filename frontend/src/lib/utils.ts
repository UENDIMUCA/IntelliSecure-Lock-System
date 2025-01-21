import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {User} from "@/lib/types.ts";
import apiClient from "@/lib/apiClient.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLoggedUser(): User | undefined {
  const user = localStorage.getItem("user");
  if (user){
    return JSON.parse(user);
  }
  return undefined;
}

export async function refreshLoggedUser(): Promise<boolean> {
  return apiClient.get(`/api/users/${getLoggedUser()?.id}`)
    .then((res) => {
      if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export function isLogged(): boolean {
  return getLoggedUser() !== undefined;
}

export function isAdmin(): boolean {
  const user: User | undefined = getLoggedUser();
  if (user){
    return user.isAdmin;
  }
  return false;
}

export async function logout(): Promise<boolean> {
  return apiClient.post(`/api/auth/logout`, {})
    .then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

