import CampGroundCard from "@/components/CampGroundCard";
import ClusterMap from "@/components/ClusterMap/ClusterMap";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CampgroundsPage() {
  const campgrounds = await prisma.campground.findMany();
  return (
    <div className="m-auto flex flex-col gap-10">
      <div className="my-5 flex h-[400px] w-[1000px] max-w-7xl items-center justify-center rounded-lg border border-solid border-neutral hover:cursor-grab">
        <ClusterMap campgrounds={campgrounds} />
      </div>

      <div className="m-auto flex max-w-4xl flex-col gap-4">
        {campgrounds.map((campground) => {
          return (
            <Link href={`/campgrounds/${campground.id}`} key={campground.id}>
              <CampGroundCard campground={campground} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
