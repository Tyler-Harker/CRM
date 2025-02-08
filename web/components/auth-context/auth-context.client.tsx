"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { UserClaims } from "@tyler-harker/crm-shared";
import { auth } from "@/firebase-lib/app";
import { jwtDecode } from "jwt-decode";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import useCookie from "@/hooks/useCookie.hook";

interface SignInWithEmailAndPasswordProps {
  email: string;
  password: string;
}

interface SignUpWithEmailAndPasswordProps {
  email: string;
  password: string;
}

interface AuthContextProps {
  claims: UserClaims | null;
  signInWithEmailAndPassword: ({
    email,
    password,
  }: SignInWithEmailAndPasswordProps) => Promise<boolean>;
  signUpWithEmailAndPassword: ({
    email,
    password,
  }: SignUpWithEmailAndPasswordProps) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshIdToken: () => Promise<void>;
}

const authContext = createContext({
  claims: null,
} as AuthContextProps);

interface AuthContextClientProps {
  children: React.ReactNode;
  claims: UserClaims | null;
}

export function AuthContextClient({
  children,
  claims: _claims,
}: AuthContextClientProps) {
  const [token, setToken] = useCookie<string | null>("token", null);
  const [claims, setClaims] = useState<UserClaims | null>(_claims);
  useEffect(() => {
    console.log(token);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user === null) {
        setClaims(null);
        return;
      }

      const idtokenResult = await auth.currentUser?.getIdTokenResult();
      setClaims({
        sub: idtokenResult?.claims.sub,
        email: idtokenResult?.claims.email,
        selectedOrganizationUid: idtokenResult?.claims.selectedOrganizationUid,
      } as UserClaims);

      return () => {
        unsubscribe();
      };
    });
  }, []);

  async function _signInWithEmailAndPassword({
    email,
    password,
  }: SignInWithEmailAndPasswordProps) {
    try {
      const creds = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await creds.user.getIdToken();
      const decodedToken = jwtDecode(idToken) as UserClaims;
      setClaims(decodedToken);
      setToken(idToken);
      return true;
    } catch {
      return false;
    }
  }

  async function _signUpWithEmailAndPassword({
    email,
    password,
  }: SignUpWithEmailAndPasswordProps) {
    try {
      const creds = await createUserWithEmailAndPassword(auth, email, password);
      if (!creds) {
        return false;
      }

      auth.signOut();
      return true;
    } catch {
      return false;
    }
  }

  async function _signOut() {
    await auth.signOut();
    setToken(null);
  }

  async function _refreshIdtoken() {
    const idToken = await auth.currentUser?.getIdToken(true);
    if (idToken == null) {
      return;
    }
    const decodedToken = jwtDecode(idToken) as UserClaims;
    setToken(idToken);
    setClaims(decodedToken);
  }

  return (
    <authContext.Provider
      value={{
        claims,
        signInWithEmailAndPassword: _signInWithEmailAndPassword,
        signUpWithEmailAndPassword: _signUpWithEmailAndPassword,
        signOut: _signOut,
        refreshIdToken: _refreshIdtoken,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(authContext);
}
