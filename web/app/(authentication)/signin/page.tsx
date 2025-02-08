import { NotSignedIn } from "@/components/auth-context/not-signed-in";
import { SigninForm } from "./signin-form";

export default function SigninPage() {
  return (
    <NotSignedIn redirectLocation="/dashboard">
      <SigninForm />
    </NotSignedIn>
  );
}
