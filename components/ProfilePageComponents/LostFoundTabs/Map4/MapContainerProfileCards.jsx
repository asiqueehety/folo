'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MapLoading from '../../../reusables/MapLoading';
import avg_location from '@/lib/avg_location';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const customIcon1 = new L.Icon({
  iconUrl: '/resources/target.png',
  iconSize: [40, 40],       // width, height
  iconAnchor: [15, 40],     // point of the icon which will correspond to marker's location
  popupAnchor: [0, -35],    // point from which the popup should open relative to the iconAnchor
  shadowSize: [40, 40],     // optional
});

const customIcon2 = new L.Icon({
  iconUrl: '/resources/blue-map-marker.png',
  iconSize: [40, 40],       // width, height
  iconAnchor: [15, 40],     // point of the icon which will correspond to marker's location
  popupAnchor: [0, -35],    // point from which the popup should open relative to the iconAnchor
  shadowSize: [40, 40],     // optional
});

const customIcon3 = new L.Icon({
  iconUrl: '/resources/red-map-marker.png',
  iconSize: [40, 40],       // width, height
  iconAnchor: [15, 40],     // point of the icon which will correspond to marker's location
  popupAnchor: [0, -35],    // point from which the popup should open relative to the iconAnchor
  shadowSize: [40, 40],     // optional
});
export default function MapContainerProfileCards(props) {
  const [userPosition, set_userPosition] = useState([])
  const [post, set_post] = useState(null)
  const [darkmode,set_darkmode] = useState(false)
  const [lo_fo, set_lo_fo] = useState(null)
  const [markers, set_markers] = useState([])
  useEffect(() => {
    set_post(props.post)
    set_darkmode(props.darkmode)
    set_lo_fo(props.lo_fo)
    set_userPosition(props.userPosition)
    console.log('dark',props.darkmode)
  }, [props.post, props.darkmode, props.userPosition, props.lo_fo]);

  function MarkerLayer() {
    const map = useMap();
    useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        set_userPosition([e.latlng.lat, e.latlng.lng])
        map.flyTo(!post? e.latlng : avg_location(post.content_location), !!post? 16 : 14.5)
        set_markers([e.latlng])
        {post && console.log(post.content_location)}
      },
    })
    return (
      <>
        {markers.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false} icon={customIcon1}>
            <Popup>
              Your location
            </Popup>
          </Marker>
        ))}
        {post && post.content_location.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false} icon={lo_fo? customIcon3:customIcon2}>
            <Popup>
              Lost item position - {`${i+1}`}
            </Popup>
          </Marker>
        ))}
      </>
    );
  }
  if (!userPosition || userPosition.length < 2) {
    console.log(userPosition);
    return <MapLoading />;
  }
  return (
    <div className={` h-fit w-fit lg:rounded-2xl rounded-xl flex lg:flex-row flex-col z-0 hover:scale-99 transition-all duration-500 ${darkmode? 'bg-neutral-800' : 'bg-white'}`}>
      <MapContainer
        center={!!post? [avg_location(post.content_location).lat, avg_location(post.content_location).lng] : userPosition}
        zoom={!!post? 17 : 14.5}
        scrollWheelZoom={true}
        className="lg:rounded-4xl rounded-2xl md:w-125 sm:w-80 w-55 lg:h-80 h-70 lg:shadow-stone-700 lg:shadow-lg shadow-none lg:m-2 m-0"
      >
        <TileLayer
          attribution='<a href="https://asiqueehety.vercel.app" target="_blank">Asique Ehety</a>'
          //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url={darkmode? process.env.NEXT_PUBLIC_MAP_URL_DARK : process.env.NEXT_PUBLIC_MAP_URL}
        />
        <MarkerLayer />
      </MapContainer>
    </div>
  );
}