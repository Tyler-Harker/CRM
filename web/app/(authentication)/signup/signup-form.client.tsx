"use client";

import { useAuthContext } from "@/components/auth-context/auth-context.client";
import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

interface SignupFormClientProps {
  error: string | null;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupFormClient({
  error: _error,
  email: _email,
  password: _password,
  confirmPassword: _confirmPassword,
}: SignupFormClientProps) {
  const [error, setError] = useState<string | null>(_error);
  const [email, setEmail] = useState<string>(_email);
  const [password, setPassword] = useState<string>(_password);
  const [confirmPassword, setConfirmPassword] =
    useState<string>(_confirmPassword);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { signUpWithEmailAndPassword } = useAuthContext();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("The passwords you provided to not match.");
      return;
    }
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const isSuccess = await signUpWithEmailAndPassword({ email, password });
    setIsLoading(false);
    if (isSuccess == false) {
      setError("A user already exists with that email address.");
      return;
    }
    location.href = "/signin";
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-4xl font-semibold">Sign up</h1>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <FormControl className="flex flex-col">
        <FormLabel>Email</FormLabel>
        <TextField
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormControl>
      <FormControl className="flex flex-col">
        <FormLabel>Password</FormLabel>
        <TextField
          placeholder="******"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormControl>
      <FormControl className="flex flex-col">
        <FormLabel>Confirm Password</FormLabel>
        <TextField
          placeholder="******"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </FormControl>
      <Button type="submit" variant="contained" disabled={isLoading}>
        Sign Up
      </Button>
      <div className="flex gap-4 items-center">
        <hr className="flex-grow" />
        <span className="text-xl mb-2">or</span>
        <hr className="flex-grow" />
      </div>
      <Button disabled variant="outlined">
        SIGN up WITH GOOGLE
      </Button>
      <Button disabled variant="outlined">
        SIGN up WITH FACEBOOK
      </Button>
      <div className="flex items-center justify-center gap-2">
        <span>Already have an account?</span>
        <a href="/signin" className="text-blue-500 underline">
          Sign in
        </a>
      </div>
    </form>
  );
}
