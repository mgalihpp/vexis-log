import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardAnalyticsLoading() {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <Skeleton className="h-16 w-full rounded-xl md:h-[640px] md:w-56" />

      <div className="flex-1 space-y-6">
        <div className="flex justify-end">
          <Skeleton className="h-8 w-56" />
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-[320px] w-full rounded-xl" />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Skeleton className="h-[320px] w-full rounded-xl" />
          <Skeleton className="h-[320px] w-full rounded-xl" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Skeleton className="h-[360px] w-full rounded-xl lg:col-span-2" />
          <Skeleton className="h-[360px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
