import Image from "next/image";
import prisma from "@/lib/prisma";
import SingleMapboxMap from "@/components/SingleMapboxMap";

interface SingleCampgroundPageProps {
  params: {
    id: string;
  };
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoieGNhcnRlcjkzIiwiYSI6ImNscmNiNDE2bTB4dzAya21yMGFjcHJtemsifQ.ExWVY2ZCjvY6vEbSd6URcA";

export default async function SingleCampgroundPage({
  params: { id },
}: SingleCampgroundPageProps) {
  const campground = await prisma.campground.findUnique({ where: { id } });

  return (
    <div className="flex gap-10">
      <div className="card w-96 bg-slate-50/80 text-black shadow-xl">
        <div className="p-8">
          <Image
            src={campground?.image || "/location-placeholder-svgrepo-com.svg"}
            alt={campground?.description || "A campground"}
            width={500}
            height={500}
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">{campground?.title}</h2>
          <p>{campground?.description}</p>
        </div>
        <div className="card-actions justify-end p-2">
          <button className="btn btn-accent btn-sm">Edit</button>
          <button className="btn btn-error btn-sm">Delete</button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex h-56 w-[500px] items-center justify-center rounded-xl border border-solid border-neutral">
          {campground && (
            <SingleMapboxMap campground={campground} token={MAPBOX_TOKEN} />
          )}
        </div>
      </div>
    </div>
  );
}
