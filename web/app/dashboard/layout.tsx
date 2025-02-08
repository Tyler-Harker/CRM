import { DashboardLayoutClient } from "./layout.client";
import { cookies } from "next/headers";
import { SidebarState } from "./sidebar";
import { IsSignedIn } from "@/components/auth-context/is-signed-in";
import { OrganizationContext } from "./organization-context";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const sidebarStateCookie = cookieStore.get("sidebar-state");
  return (
    <IsSignedIn redirectLocation="/signin">
      <OrganizationContext>
        <DashboardLayoutClient
          sidebarState={(sidebarStateCookie?.value as SidebarState) ?? "Closed"}
        >
          {children}
        </DashboardLayoutClient>
      </OrganizationContext>
    </IsSignedIn>
  );
}
