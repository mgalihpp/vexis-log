"use client";

import { usePathname } from "next/navigation";
import { SECTIONS } from "@/features/settings/constants/section";
import { SubSidebar } from "@/components/dashboard/SubSidebar";

type Props = {
  children: React.ReactNode;
};

export function SettingsLayoutContent({ children }: Props) {
  const pathname = usePathname();
  const activeSection = pathname.split("/")[3];

  const activeObj =
    SECTIONS.find((s) => s.value === activeSection) ?? SECTIONS[0];
  const ActiveIcon = activeObj.icon;

  const sidebarItems = SECTIONS.map((sec) => ({
    id: sec.value,
    label: sec.label,
    icon: sec.icon,
    to: `/dashboard/settings/${sec.value}`,
    isActive: activeSection === sec.value,
  }));

  return (
    <div className="flex gap-6">
      <SubSidebar
        title="Settings"
        items={sidebarItems}
        className="top-15"
        mobileClassName="absolute top-[73px] left-0 right-0 py-3"
      />

      <div className="flex-1 min-w-0 space-y-4 md:mt-0 mt-14">
        <div className="flex items-center gap-2 mb-2">
          <ActiveIcon className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {activeObj.label}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
}
