import { cookies, headers } from "next/headers";
import { OrganizationContextClient } from "./organization-context.client";
import { jwtDecode } from "jwt-decode";
import { UserClaims } from "@tyler-harker/crm-shared";
import { redirect } from "next/navigation";

export const whitelistedPaths = [
  "/dashboard/organizations",
  "/dashboard/organizations/create",
];

interface OrganizationContextProps {
  children: React.ReactNode;
}
export async function OrganizationContext({
  children,
}: OrganizationContextProps) {
  const headersList = await headers();
  const currentPath = headersList.get("x-pathname") as string;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session");
  let userClaims: UserClaims | null = null;
  let token: string | null = null;
  if (sessionCookie) {
    token = JSON.parse(sessionCookie.value)["token"];
  }
  if (token) {
    userClaims = jwtDecode(token);
  }

  if (
    userClaims?.selectedOrganizationUid === undefined &&
    whitelistedPaths.indexOf(currentPath) == -1
  ) {
    console.log(currentPath);
    redirect("/dashboard/organizations");
    return;
  }

  return <OrganizationContextClient>{children}</OrganizationContextClient>;
}
