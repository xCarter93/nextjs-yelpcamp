"use server";

import { redirect } from "next/navigation";
import { env } from "../env";
import prisma from "../prisma";

const geoCodeLocation = async (location: string) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${env.MAPBOX_TOKEN}`,
  );
  const data = await response.json();
  return data;
};

export const addCampground = async (prevState: any, formData: FormData) => {
  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const userId = formData.get("userId") as string;
  const image = formData.get("image") as File;
  const price = formData.get("price") as string;

  const geoData = await geoCodeLocation(location);

  const newCampground = await prisma.campground.create({
    data: {
      title,
      description,
      price: parseFloat(price),
      location,
      geometry: geoData.features[0].geometry,
      authorId: userId,
    },
  });
  redirect(`/campgrounds/${newCampground.id}`);
};
