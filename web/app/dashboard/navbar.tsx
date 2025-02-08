import MenuIcon from "@mui/icons-material/Menu";
import { useDashboardLayoutContext } from "./layout.client";
import { useAuthContext } from "@/components/auth-context/auth-context.client";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
export function DashboardNavbar() {
  const { setSidebarState } = useDashboardLayoutContext();
  const { claims } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const clickProfile = (target: HTMLElement) => {
    setAnchorEl(target);
  };
  const closeProfile = () => {
    setAnchorEl(null);
  };
  return (
    <div className="bg-slate-800 w-full h-14 flex items-center px-2 gap-2 justify-between sm:justify-end">
      <div
        className="flex sm:hidden items-center justify-center p-1 cursor-pointer"
        onClick={() => setSidebarState("Open")}
      >
        <MenuIcon className="text-white" />
      </div>

      <div
        className="text-white flex gap-4 items-center cursor-pointer"
        onClick={(e) => clickProfile(e.currentTarget)}
        id="profile-button"
      >
        {claims?.email}
        <Avatar sx={{ height: 32, width: 32 }} />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeProfile}
        id="profile-menu"
        MenuListProps={{ "aria-labelledby": "profile-button" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={closeProfile}>
          <Link href="/dashboard/my-profile">My Profile</Link>
        </MenuItem>
        <MenuItem onClick={closeProfile}>
          <Link href="/signout">Sign Out</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
