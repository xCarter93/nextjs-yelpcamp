"use client";

import { useAuth } from "@clerk/nextjs";
import { useFormState, useFormStatus } from "react-dom";
import { addCampground } from "@/lib/actions/actions";
import { useRef } from "react";
import AddCampgroundButton from "@/components/AddCampgroundButton";

export default function AddCampgroundPage() {
  const [state, formAction] = useFormState(addCampground, undefined);
  const auth = useAuth();

  const ref = useRef<HTMLFormElement>(null);

  return (
    <div className="max-w-3xl">
      <h1 className="mb-4 text-center text-3xl font-bold">
        Add New Campground
      </h1>
      <form
        action={async (formData) => {
          await formAction(formData);
          ref.current?.reset();
        }}
        ref={ref}
      >
        <input type="hidden" name="userId" value={auth.userId || ""} />
        <input
          type="text"
          required
          name="title"
          placeholder="Title"
          className="input input-bordered mb-3 w-full"
        />

        <input
          type="text"
          required
          name="location"
          placeholder="Location"
          autoComplete="address-level2"
          className="input input-bordered mb-3 w-full"
        />

        <input
          type="number"
          required
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
          step={0.01}
          min={0}
        />
        <input
          type="file"
          className="file-input file-input-bordered mb-3 w-full"
          name="image"
        />
        <textarea
          placeholder="Description"
          name="description"
          className="textarea textarea-bordered  mb-3 w-full"
          rows={3}
        ></textarea>

        <AddCampgroundButton />
      </form>
    </div>
  );
}

// TODO: Add New Campground Page for adding a campground.  Should use form actions
// to add a campground to the database.  Should redirect to the campground's page
