// import 'leaflet/dist/leaflet.css'
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import { useState,useRef,useEffect} from 'react';
// import L from 'leaflet';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconUrl: markerIcon.src,
//     iconRetinaUrl: markerIcon2x.src,
//     shadowUrl: markerShadow.src,
// })
// export default function MapPage() {
//   const [position, setPosition] = useState([]);

//   function LocationMarker() {
//   const map = useMapEvents({
//     click() {
//       map.locate()
//     },
//     locationfound(e) {
//       setPosition(e.latlng)
//       map.flyTo(e.latlng, map.getZoom())
//     },
//   })
//     return position === null ? null : (
//       <Marker position={position}>
//         <Popup>You are here</Popup>
//       </Marker>
//     )
//   }

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const coords = [pos.coords.latitude, pos.coords.longitude];
//           setUserPosition(coords);
//         },
//         (err) => {
//           alert('Geolocation error: ' + err.message);
//         }
//       );
//     } else {
//       alert('Geolocation not supported.');
//     }
//   }, []);

//   function DraggableMarker() {
//     const markerRef = useRef(null);
//     const map = useMapEvents({
//       click(e) {
//         if(position.length==0) map.locate(); // Get user's location on first click
//         else if(position.length < 5)
//         {
//           const { latlng } = e;
//           setPosition((prev) => [...prev, latlng]);
//         }
//         console.log(position);
//       },
//       locationfound(e) {
//         if(position.length==0)
//         {
//           setPosition((prev) => [...prev, e.latlng]);
//           map.flyTo(e.latlng, map.getZoom());
//         }
//         console.log(position);
//       },
//     });
//     if (!position) return null;

//     return (
//       <>
//       {position.map((pos,ind)=>
//       (
//         <Marker
//         key={ind}
//         draggable={true}
//         // eventHandlers={eventHandlers}
//         position={pos}
//         ref={markerRef}
//       >
//         <Popup minWidth={90}>

//         </Popup>
//       </Marker>
//       ))}
//       </>
//     )
//   }



//   return (
//     <MapContainer center={} zoom={30} scrollWheelZoom={true} className='rounded-4xl mt-30 w-full h-150'>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <DraggableMarker/>
//     </MapContainer>
//   )
// }


'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix leaflet's default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

export default function MapPage() {
  const [userPosition, setUserPosition] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Get user location when component mounts
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

  function DraggableMarkerLayer() {
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
    
  }

  return (
    <div className=' bg-stone-800/40 h-fit w-fit m-4 rounded-2xl backdrop-blur-md border border-white/30 shadow-lg shadow-stone-800 flex flex-row'>
      <MapContainer
        center={userPosition}
        zoom={100}
        scrollWheelZoom={true}
        className="rounded-4xl w-200 h-150 shadow-stone-700 shadow-lg m-3"
      >
        <TileLayer
          attribution='&copy; <a href="https://asiqueehety.vercel.app" target="_blank">Asique Ehety</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarkerLayer />
      
      
      </MapContainer>
      <button className={`bg-gray-800 text-white p-2 m-1 text-sm rounded-4xl h-fit w-fit transition-all ${markers.length == 1? 'disabled opacity-20':''}`} onClick={()=>{undoClicked()}}>
        Undo
      </button>
    </div>
  );
}
