import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function AddCampgroundButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={pending}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" size={16} />}
      Add Campground
    </button>
  );
}
