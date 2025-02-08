"use client";
import { useAuthContext } from "./auth-context.client";

interface NotSignedInClientProps {
  children: React.ReactNode;
  redirectLocation?: string;
}
export function NotSignedInClient({
  children,
  redirectLocation,
}: NotSignedInClientProps) {
  const { claims } = useAuthContext();
  if (claims) {
    if (redirectLocation && location) {
      location.href = redirectLocation;
    }
  } else {
    return children;
  }
}
