import { formatMoney } from "@/lib/utils";
import { Campground } from "@prisma/client";
import Image from "next/image";

interface CampGroundCardProps {
  campground: Campground;
}

export default function CampGroundCard({ campground }: CampGroundCardProps) {
  return (
    <div className="card card-side bg-slate-50/80 shadow-xl hover:bg-slate-50/60">
      <div className="p-9">
        <Image
          src={campground.image || "/location-placeholder-svgrepo-com.svg"}
          alt={campground.title}
          width={100}
          height={100}
        />
      </div>
      <div className="card-body text-black">
        <h2 className="card-title">{campground.title}</h2>
        <p>{campground.location}</p>
        <p>{campground.description}</p>
        <p>{formatMoney(campground.price)}</p>
      </div>
    </div>
  );
}
