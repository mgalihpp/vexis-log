import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardTradeEditLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-4 w-72" />
      </div>

      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-[520px] w-full rounded-xl" />

      <div className="flex justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
