import React from 'react';
import {
  Map as MapContainer,
  TileLayer,
  Marker,
  MapEvents,
} from 'react-leaflet';

import mapmarker from '../../assets/mapmarker.png';
import mapmarkershadow from '../../assets/mapmarkershadow.png';

import { icon } from 'leaflet';

interface MapProps extends MapEvents {
  coordinates: number[];
  marker?: number[];
}

const Map: React.FC<MapProps> = ({ coordinates, marker, ...rest }) => {
  const markerIcon = icon({
    iconUrl: mapmarker,
    iconSize: [36, 50],
    iconAnchor: [18, 50],
    shadowUrl: mapmarkershadow,
    shadowSize: [50, 50],
    shadowAnchor: [18, 50],
  });

  return (
    <MapContainer
      style={{
        borderRadius: 10,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      center={[coordinates[0], coordinates[1]]}
      zoom={15}
      {...rest}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMapContainer</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker && <Marker icon={markerIcon} position={[marker[0], marker[1]]} />}
    </MapContainer>
  );
};

export default Map;