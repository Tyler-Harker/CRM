"use client";

import { Button, FormControl, FormLabel, TextField } from "@mui/material";

export function ForgotPasswordFormClient() {
  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-4xl font-semibold">Forgot Password?</h1>
      <FormControl className="flex flex-col">
        <FormLabel>Email</FormLabel>
        <TextField placeholder="Enter your email address" />
      </FormControl>
      <Button type="submit" variant="contained">
        Send password reset link
      </Button>
      <div className="flex items-center justify-center gap-2">
        <span>Back to</span>
        <a href="/signin" className="text-blue-500 underline">
          Sign in
        </a>
      </div>
    </form>
  );
}
