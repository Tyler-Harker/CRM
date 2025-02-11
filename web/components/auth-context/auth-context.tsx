import { cookies } from "next/headers";
import { AuthContextClient } from "./auth-context.client";
import { UserClaims } from "@tyler-harker/crm-shared";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  children: React.ReactNode;
}
export async function AuthContext({ children }: AuthContextProps) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session");

  let token: string | null = null;
  if (sessionCookie) {
    token = JSON.parse(sessionCookie.value)["token"];
  }

  let userClaims: UserClaims | null = null;
  if (token) {
    userClaims = jwtDecode(token);
    if (Math.floor(Date.now() / 1000) > (userClaims?.exp ?? 0)) {
      userClaims = null;
      console.log("here we are");
    }
  }
  return <AuthContextClient claims={userClaims}>{children}</AuthContextClient>;
}
