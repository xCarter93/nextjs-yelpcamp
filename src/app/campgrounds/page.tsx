import ClusterMap from "@/components/ClusterMap/ClusterMap";

export default function CampgroundsPage() {
  return (
    <div className="flex flex-col gap10 max-w-5xl m-auto">
      <ClusterMap />

      {/* TODO: Add Individual campground listings with pagination */}
    </div>
  );
}
