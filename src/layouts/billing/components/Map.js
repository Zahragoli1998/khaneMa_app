import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Control, Icon } from "leaflet";
// import L
// import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { Marker, Popup, TileLayer, useMapEvents, MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { position } from "stylis";
const center = {
  lat: 35.687195,
  lng: 51.388413,
};
const skater = new Icon({
  iconUrl: require("../../../assets/images/icons8-location-40.png"),
  iconSize: [25, 25],
  position: "absolute",
});
const Map = ({ setLocation }) => {
	function MyComponent() {
		const map = useMapEvents({
			dragend :(e) =>{
				const location = e.target.getCenter()
				setLocation(location)
			}
		})
		return null
	}
  return (
    <div className="mapContainer">
      <div className="map-marker-centered"><img src={require('../../../assets/images/icons8-location-48.png')}/></div>
      <div className="map">
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} >
				<MyComponent />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
