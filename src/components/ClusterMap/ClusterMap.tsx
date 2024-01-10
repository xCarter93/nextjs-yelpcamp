"use client";

import { Layer, Map, Source } from "react-map-gl";
import ControlPanel from "./ControlPanel";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";
import type { LngLatLike, MapRef } from "react-map-gl";
import type { GeoJSONSource } from "react-map-gl";
import { useRef } from "react";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoieGNhcnRlcjkzIiwiYSI6ImNsbHMwNjAzcjBvMmkzcXMyMnh2dTQydDAifQ.63Qyqcn0xWvELvjTd2riBg";

export default function ClusterMap() {
  const mapRef = useRef<MapRef>(null);

  const onClick = (event: {
    features?: GeoJSON.Feature<GeoJSON.Point, any>[];
    lngLat: [number, number];
  }) => {
    const feature = event.features?.[0];
    const clusterId = feature?.properties?.cluster_id;

    const mapboxSource = mapRef.current?.getSource(
      "earthquakes",
    ) as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      mapRef.current?.easeTo({
        center: feature?.geometry.coordinates as LngLatLike | undefined,
        zoom,
        duration: 500,
      });
    });
  };

  return (
    <div className="max-w-5xl h-[350px] flex justify-center border border-solid border-neutral rounded-lg">
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id as string]}
        // onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
      {/* <ControlPanel /> */}
    </div>
  );
}
