'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

export default function MapPage() {
  const [userPosition, setUserPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setUserPosition(coords);
          setMarkers([{lat:pos.coords.latitude,lng:pos.coords.longitude}])
        },
        (err) => {
          alert('Geolocation error: ' + err.message);
        }
      );
    } else {
      alert('Geolocation not supported.');
    }
  }, []);

  function MarkerLayer() {
    useMapEvents({
      click(e) {
        if (markers.length < 5) {
          setMarkers((prev) => [...prev, e.latlng]);
          console.log(markers);
        }
      },
    });
    return (
      <>
        {markers.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false}>
            <Popup>{i==0? 'Your present location is the primary probable location': `Probable Location ${i + 1}`}</Popup>
          </Marker>
        ))}
      </>
    );
  }
  if (!userPosition) {
    return <div className="text-center mt-10">Fetching location...</div>;
  }
  function undoClicked()
  {
    if(markers.length>1)
    {
      setMarkers(prev => prev.slice(0,-1))
    }
    console.log(markers)
  }
  return (
    <div className=' bg-stone-800/40 h-fit w-fit lg:m-4 m-0 lg:rounded-2xl rounded-none backdrop-blur-md border border-white/30 shadow-lg shadow-stone-800 flex lg:flex-row flex-col'>
      <MapContainer
        center={userPosition}
        zoom={100}
        scrollWheelZoom={true}
        className="lg:rounded-4xl rounded-none lg:w-200 lg:h-150 w-screen h-80 lg:shadow-stone-700 lg:shadow-lg shadow-none lg:m-3 m-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://asiqueehety.vercel.app" target="_blank">Asique Ehety</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerLayer />
      </MapContainer>
      <button className={`bg-gray-800 text-white p-2 m-1 text-sm rounded-4xl h-fit w-fit transition-all ${markers.length == 1? 'disabled opacity-20':''}`} onClick={()=>{undoClicked()}}>
        Undo
      </button>
    </div>
  );
}
