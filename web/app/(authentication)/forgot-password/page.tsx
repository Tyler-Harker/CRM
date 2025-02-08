import { NotSignedIn } from "@/components/auth-context/not-signed-in";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <NotSignedIn redirectLocation="/dashboard">
      <ForgotPasswordForm />
    </NotSignedIn>
  );
}
