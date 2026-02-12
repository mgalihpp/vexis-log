import { SettingsLayoutContent } from "@/components/pages/dashboard/SettingsLayoutContent";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingsLayoutContent>{children}</SettingsLayoutContent>;
}

export function generateMetadata() {
  return {
    title: "Settings - Vexis Log",
  };
}
