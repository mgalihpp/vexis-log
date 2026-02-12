import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardTradeLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Skeleton className="h-[560px] w-full rounded-xl lg:col-span-2" />
        <Skeleton className="h-[560px] w-full rounded-xl lg:col-span-3" />
      </div>
    </div>
  );
}
