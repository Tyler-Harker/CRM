import { UserClaims } from "@tyler-harker/crm-shared";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getCookieValue<T>(cookieName: string): Promise<T | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session");
  if (sessionCookie) {
    return JSON.parse(sessionCookie.value)[cookieName];
  }
  return null;
}

export async function getIdToken(): Promise<string | null> {
  return await getCookieValue<string>("token");
}

export async function getUserClaims(
  token: string | null = null
): Promise<UserClaims | null> {
  if (!token) {
    token = await getIdToken();
  }
  return token == null ? null : jwtDecode(token);
}
