"use client";

import { useRef } from "react";
import { Map, Source, Layer } from "react-map-gl";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";
import type { MapRef } from "react-map-gl";
import type { GeoJSONSource } from "react-map-gl";
import { Campground } from "@prisma/client";

import "mapbox-gl/dist/mapbox-gl.css";

interface ClusterMapProps {
  campgrounds: Campground[];
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoieGNhcnRlcjkzIiwiYSI6ImNscmNiNDE2bTB4dzAya21yMGFjcHJtemsifQ.ExWVY2ZCjvY6vEbSd6URcA";

export default function ClusterMap({ campgrounds }: ClusterMapProps) {
  const mapRef = useRef<MapRef>(null);

  const campgroundData: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: campgrounds.map((campground: Campground) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: campground.geometry.coordinates,
      },
      properties: campground,
    })),
  };

  const onClick = (event: any) => {
    const feature = event.features[0];

    const clusterId = feature.properties.cluster_id;

    const mapboxSource = mapRef.current?.getSource(
      "campgrounds",
    ) as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current?.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    });
  };
  return (
    <>
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3,
        }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id as string]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="campgrounds"
          type="geojson"
          data={campgroundData}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  );
}
