"use client";

import { Campground } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import Map, { Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

interface SingleMapboxMapProps {
  campground: Campground;
  token: string;
}

export default function SingleMapboxMap({
  campground,
  token,
}: SingleMapboxMapProps) {
  return (
    <>
      <Map
        initialViewState={{
          latitude: campground.geometry.coordinates[1],
          longitude: campground.geometry.coordinates[0],
          zoom: 6,
        }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        mapboxAccessToken={token}
      >
        <Marker
          longitude={campground.geometry.coordinates[0]}
          latitude={campground.geometry.coordinates[1]}
          color="red"
        />
      </Map>
    </>
  );
}
