import { useDashboardLayoutContext } from "./layout.client";
import { SidebarNavItem } from "./sidebar-nav-item";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ChatIcon from "@mui/icons-material/Chat";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage.hook";

export type SidebarState = "Open" | "Preview" | "Closed";

type DisplayType = "Mobile" | "Tablet" | "Desktop";

function getDisplayType(width: number): DisplayType {
  if (width <= 640) {
    return "Mobile";
  } else if (width <= 1023) {
    return "Tablet";
  }
  return "Desktop";
}

export default function Sidebar() {
  const { sidebarState, setSidebarState } = useDashboardLayoutContext();
  const [displayType, setDisplayType] = useLocalStorage<DisplayType>(
    "display-type",
    getDisplayType(0)
  );

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      // setWindowWidth(window.innerWidth);
      setDisplayType(getDisplayType(window.innerWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    console.log(displayType, sidebarState);
    if (displayType === "Mobile" && sidebarState !== "Closed") {
      setSidebarState("Closed");
    } else if (displayType == "Tablet" && sidebarState === "Closed") {
      setSidebarState("Preview");
    } else if (displayType == "Desktop" && sidebarState === "Closed") {
      setSidebarState("Open");
    }
  }, [displayType]);

  let sidebarMaxWidth: string = "";
  switch (sidebarState) {
    case "Open":
      sidebarMaxWidth = "max-w-60 min-w-60";
      break;
    case "Preview":
      sidebarMaxWidth = "max-w-12 min-w-12";
      break;
    case "Closed":
      sidebarMaxWidth = "max-w-0 min-w-0";
      break;
  }
  return (
    <>
      <section
        className={`fixed top-0 left-0 bottom-0 z-10 sm:relative w-60 bg-gray-100 border-gray-300 border-r shadow-md ${sidebarMaxWidth} overflow-x-hidden transition-all`}
      >
        <div className="h-14 flex items-center justify-center text-3xl font-bold border-b cursor-pointer">
          {sidebarState === "Preview" ? (
            <div className="flex items-center justify-center">
              <KeyboardArrowRightIcon
                fontSize="large"
                onClick={() => {
                  setSidebarState("Open");
                }}
              />
            </div>
          ) : (
            <div className="flex w-full items-center gap-4 px-2">
              <div
                className="p-1 overflow-hidden w- h-10 flex items-center justify-center"
                onClick={() => {
                  if (displayType === "Mobile") {
                    setSidebarState("Closed");
                  } else {
                    setSidebarState("Preview");
                  }
                }}
              >
                <KeyboardArrowLeftIcon fontSize="large" />
              </div>
              LOGO
            </div>
          )}
        </div>
        <div className="">
          <SidebarNavItem
            href="/dashboard"
            text="Dashboard"
            icon={<DashboardIcon fontSize="medium" />}
          />
          <SidebarNavItem
            href="/dashboard/organizations"
            text="Organizations"
            icon={<GroupsIcon fontSize="medium" />}
          />
          <SidebarNavItem
            href="/dashboard/leads"
            text="Leads"
            icon={<WhatshotIcon fontSize="medium" />}
          />
          <SidebarNavItem
            href="/dashboard/conversations"
            text="Conversations"
            icon={<ChatIcon fontSize="medium" />}
          />
        </div>
      </section>
      {sidebarState === "Open" ? (
        <div
          className="fixed sm:hidden top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-20 z-[5] cursor-pointer"
          onClick={() => setSidebarState("Closed")}
        ></div>
      ) : null}
    </>
  );
}
