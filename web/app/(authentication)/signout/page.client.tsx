"use client";
import { useAuthContext } from "@/components/auth-context/auth-context.client";
import Link from "next/link";
import { useEffect } from "react";

export function SignoutPageclient() {
  const { signOut } = useAuthContext();
  useEffect(() => {
    signOut();
  }, []);
  return (
    <div>
      You have been signed out. Click{" "}
      <Link className="text-blue-500 underline" href="/signin">
        Here
      </Link>{" "}
      to sign in again.
    </div>
  );
}
