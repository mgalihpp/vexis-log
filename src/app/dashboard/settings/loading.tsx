import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSettingsLoading() {
  return (
    <div className="flex gap-6">
      <Skeleton className="h-16 w-full rounded-xl md:h-[420px] md:w-56" />

      <div className="flex-1 space-y-4 md:mt-0 mt-14">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>

        <Skeleton className="h-[260px] w-full rounded-xl" />
        <Skeleton className="h-[260px] w-full rounded-xl" />
      </div>
    </div>
  );
}
