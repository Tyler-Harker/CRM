import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NotSignedInClient } from "./not-signed-in.client";

interface NotSignedInProps {
  children: React.ReactNode;
  redirectLocation?: string;
}
export async function NotSignedIn({
  children,
  redirectLocation,
}: NotSignedInProps) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session");

  let token: string | null = null;
  if (sessionCookie) {
    token = JSON.parse(sessionCookie.value)["token"];
  }
  if (token) {
    if (redirectLocation) {
      redirect(redirectLocation);
    }
    return null;
  }
  return (
    <NotSignedInClient redirectLocation={redirectLocation}>
      {children}
    </NotSignedInClient>
  );
}
