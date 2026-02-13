import {
  BookOpen,
  History,
  LayoutDashboard,
  LineChart,
  Settings,
} from "lucide-react";

export const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/trade", label: "Trade Journal", icon: BookOpen },
  { href: "/dashboard/analytics", label: "Analytics", icon: LineChart },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];
