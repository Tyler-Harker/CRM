"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarNavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}
export function SidebarNavItem({ href, icon, text }: SidebarNavItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const pathname = usePathname();
  useEffect(() => {
    const _isActive = pathname == href;
    if (isActive !== _isActive) {
      setIsActive(_isActive);
    }
  }, [isActive, href, pathname]);

  return (
    <Link href={href}>
      <div
        className={`flex gap-3 text-lg items-center  px-3 py-3 min-w-6 overflow-hidden transition-all ${
          isActive ? "bg-gray-500 text-white" : "hover:bg-gray-300"
        }`}
      >
        <div className="flex items-center">{icon}</div>

        {text}
      </div>
    </Link>
  );
}
