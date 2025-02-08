"use client";

import { useAuthContext } from "@/components/auth-context/auth-context.client";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

interface SigninFormClientProps {
  error: string | null;
  email: string;
  password: string;
  rememberMe: boolean;
}

export function SigninFormClient({
  error: _error,
  email: _email,
  password: _password,
  rememberMe: _rememberMe,
}: SigninFormClientProps) {
  const [error, setError] = useState<string | null>(_error);
  const [email, setEmail] = useState<string>(_email);
  const [password, setPassword] = useState<string>(_password);
  const [remmeberMe, setRememberMe] = useState<boolean>(_rememberMe);

  const { signInWithEmailAndPassword } = useAuthContext();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const isSuccess = await signInWithEmailAndPassword({ email, password });
    if (!isSuccess) {
      setError("Invalid email or password.");
      return;
    }

    location.href = "/dashboard";
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-4xl font-semibold">Sign in</h1>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <FormControl className="flex flex-col">
        <FormLabel>Email</FormLabel>
        <TextField
          placeholder="Enter your email address"
          type="email"
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
      <FormControl>
        <FormControlLabel
          label="Remember me"
          control={
            <Checkbox
              value={remmeberMe}
              onChange={(e) => setRememberMe(e.target.value == "true")}
            />
          }
        />
      </FormControl>
      <Button type="submit" variant="contained">
        Sign In
      </Button>
      <a
        href="/forgot-password"
        className="flex items-center justify-center text-blue-500 underline"
      >
        Forgot your password?
      </a>
      <div className="flex gap-4 items-center">
        <hr className="flex-grow" />
        <span className="text-xl mb-2">or</span>
        <hr className="flex-grow" />
      </div>
      <Button disabled variant="outlined">
        SIGN IN WITH GOOGLE
      </Button>
      <Button disabled variant="outlined">
        SIGN IN WITH FACEBOOK
      </Button>
      <div className="flex items-center justify-center gap-2">
        <span>Don&lsquo;t have an account?</span>
        <a href="/signup" className="text-blue-500 underline">
          Sign up
        </a>
      </div>
    </form>
  );
}
