import { IsSignedInClient } from "./is-signed-in.client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface IsSignedInProps {
  children: React.ReactNode;
  redirectLocation?: string;
}
export async function IsSignedIn({
  children,
  redirectLocation,
}: IsSignedInProps) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session");

  let token: string | null = null;
  if (sessionCookie) {
    token = JSON.parse(sessionCookie.value)["token"];
  }

  if (token) {
    return (
      <IsSignedInClient redirectLocation={redirectLocation}>
        {children}
      </IsSignedInClient>
    );
  } else if (redirectLocation) {
    redirect(redirectLocation);
  }
}
