import { SigninFormClient } from "./signin-form.client";

export async function SigninForm() {
  return (
    <SigninFormClient email="" password="" rememberMe={false} error={null} />
  );
}
