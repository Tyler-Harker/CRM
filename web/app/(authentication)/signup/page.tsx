import { NotSignedIn } from "@/components/auth-context/not-signed-in";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <NotSignedIn redirectLocation="/dashboard">
      <SignupForm />
    </NotSignedIn>
  );
}
