"use client";
import { useAuthContext } from "./auth-context.client";

interface IsSignedInClientProps {
  children: React.ReactNode;
  redirectLocation?: string;
}
export function IsSignedInClient({
  children,
  redirectLocation,
}: IsSignedInClientProps) {
  const { claims } = useAuthContext();
  if (claims) {
    return children;
  } else if (redirectLocation) {
    location.href = redirectLocation;
  }
  return claims ? <>{children}</> : null;
}
