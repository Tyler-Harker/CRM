"use client";
import { useAuthContext } from "@/components/auth-context/auth-context.client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";

export const whitelistedPaths = [
  "/dashboard/organizations",
  "/dashboard/organizations/create",
];

interface OrganizationContextProps {
  selectedOrganizationUid: string | null;
  selectOrganization: (organizationUid: string) => Promise<void>;
}
const organizationContext = createContext<OrganizationContextProps>({
  selectedOrganizationUid: null,
  selectOrganization: async (organizationUid: string) => {
    console.log(organizationUid);
  },
});

interface OrganizationContextClientProps {
  children: React.ReactNode;
}
export function OrganizationContextClient({
  children,
}: OrganizationContextClientProps) {
  const { claims } = useAuthContext();
  const router = useRouter();
  const pathName = usePathname();
  async function selectOrganization(organizationUid: string) {
    console.log(organizationUid);
  }
  useEffect(() => {
    if (
      !claims?.selectedOrganizationUid &&
      whitelistedPaths.indexOf(pathName) == -1
    ) {
      router.back();
    }
  }, [pathName]);

  return (
    <organizationContext.Provider
      value={{
        selectedOrganizationUid: null,
        selectOrganization,
      }}
    >
      {children}
    </organizationContext.Provider>
  );
}
export function useOrganizationContext() {
  return useContext(organizationContext);
}
