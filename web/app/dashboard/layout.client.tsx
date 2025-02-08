"use client";

import { createContext, useContext, ReactNode } from "react";
import Sidebar, { SidebarState } from "./sidebar";
import { DashboardNavbar } from "./navbar";
import useCookie from "@/hooks/useCookie.hook";

// Context definition with proper types
interface DashboardLayoutContextProps {
  sidebarState: SidebarState;
  setSidebarState: (state: SidebarState) => void;
}

const dashboardLayoutContext = createContext<
  DashboardLayoutContextProps | undefined
>(undefined);

interface DashboardLayoutClientProps {
  children: ReactNode;
  sidebarState: SidebarState;
}

export function DashboardLayoutClient({
  children,
  sidebarState: _sidebarState,
}: DashboardLayoutClientProps) {
  // Use the custom hook to manage sidebar state with cookie persistence
  const [sidebarState, setSidebarState] = useCookie<SidebarState>(
    "sidebar-state",
    _sidebarState // Initial value if cookie doesn't exist
  );

  return (
    <dashboardLayoutContext.Provider
      value={{
        sidebarState,
        setSidebarState,
      }}
    >
      <div className="flex h-full relative box-border max-w-full">
        <Sidebar />
        <section className="relative box-border flex-grow flex-shrink">
          <DashboardNavbar />
          <div className="p-4">{children}</div>
        </section>
      </div>
    </dashboardLayoutContext.Provider>
  );
}

// Hook to access context in any child component
export function useDashboardLayoutContext() {
  const context = useContext(dashboardLayoutContext);
  if (!context) {
    throw new Error(
      "useDashboardLayoutContext must be used within a DashboardLayoutClient"
    );
  }
  return context;
}
