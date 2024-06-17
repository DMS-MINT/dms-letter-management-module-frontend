import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

export default function LetterDetailSkeleton() {
  return (
    <section className="grid gap-5 h-fit pb-5 flex-1">
      <section className="card">
        <h2 className="font-semibold text-lg">
          <Skeleton className="w-[200px] h-6" />
        </h2>
        <section className="p-2 flex gap-2 flex-col">
          <Skeleton className="h-6 max-w-96" />
          <Skeleton className="h-6 max-w-96" />
          <Skeleton className="h-6 max-w-96" />
          <Skeleton className="h-6 max-w-96" />
          <Skeleton className="h-6 max-w-96" />
        </section>
      </section>
      <section className="card">
        <section className="flex flex-col gap-5">
          <h2 className="font-semibold text-lg">
            <Skeleton className="w-[200px] h-6" />
          </h2>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="ጉዳዩ">
                  <Skeleton className="w-20 h-6" />
                </Label>
                <Skeleton className="w-60 h-9" />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="የገጾች ብዛት">
                  <Skeleton className="w-20 h-6" />
                </Label>
                <Skeleton className="w-60 h-9" />
              </div>
            </div>
          </div>
          <section className="flex flex-col gap-1.5">
            <Label htmlFor="ጉዳዩ">
              <Skeleton className="w-20 h-6" />
            </Label>
            <Skeleton className="h-48 bg-gray-100" />
          </section>
        </section>
      </section>
    </section>
  );
}
