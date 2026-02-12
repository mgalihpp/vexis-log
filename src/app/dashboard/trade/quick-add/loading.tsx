import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardQuickAddLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-52" />
      </div>

      <Skeleton className="h-[560px] w-full rounded-xl" />
    </div>
  );
}
