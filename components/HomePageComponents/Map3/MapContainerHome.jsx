'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MapLoading from './../../reusables/MapLoading';
import LostPopup from './LostPopup';
import FoundPopup from './FoundPopup';

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




export default function MapContainerHome() {
  const [userPosition, setUserPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [lost_posts, set_lost_posts] = useState()
  const [found_posts, set_found_posts] = useState()
  const [lostlocs, set_lostlocs] = useState([])
  const [foundlocs, set_foundlocs] = useState([])

  function avg_location(arr)
  {
    let lat = 0
    let lng = 0
    for (let i = 0; i < arr.length; i++) {
      lat += arr[i].lat
      lng += arr[i].lng
    }
    lat /= arr.length
    lng /= arr.length
    return {lat,lng}
  }


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

  useEffect(() => {
    fetch('/api/get_all_posts',{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(data => {
      set_lost_posts(data.lost_posts)
      set_found_posts(data.found_posts)
    })
  }, []);

  useEffect(() => {
    if (found_posts) {
      const foundLocs = found_posts.map(post => ({
        lat: post.content_location[0].lat,
        lng: post.content_location[0].lng,
        post_id: post._id,
        post_name: post.content_name,
        post_type: post.content_type,
        post_pic: post.content_pic
      }));
      set_foundlocs(foundLocs);
    }

    if (lost_posts) {
      const lostLocs = lost_posts.map(post => {
        const avg_loc = avg_location(post.content_location);
        return { 
          lat: avg_loc.lat,
          lng: avg_loc.lng,
          post_id: post._id,
          post_name: post.content_name,
          post_type: post.content_type,
          post_pic: post.content_pic,
          post_reward: post.finder_reward
        };
      });
      set_lostlocs(lostLocs);
    }
  }, [lost_posts, found_posts]);


  function MarkerLayer() {
    useMapEvents({
      click(e) {
        if (markers.length < 1) {
          const newMarkers = [...markers, e.latlng];
          setMarkers(newMarkers); // now using updated array
          console.log(newMarkers)
        }
      },
    });
    return (
      <>
        {markers.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false} icon={customIcon1}>
            <Popup>
              Your location
            </Popup>
          </Marker>
        ))}
        {foundlocs.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false} icon={customIcon2}>
            <Popup>
              <FoundPopup post_name={pos.post_name} post_type={pos.post_type} post_pic={pos.post_pic}/>
            </Popup>
          </Marker>
        ))}
        {lostlocs.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false} icon={customIcon3}>
            <Popup>
              <LostPopup post_name={pos.post_name} post_type={pos.post_type} post_pic={pos.post_pic} post_reward={pos.post_reward}/>
            </Popup>
          </Marker>
        ))}
      </>
    );
  }
  if (!userPosition) {
    return <div className='flex justify-center items-center'><MapLoading/></div>;
  }
  return (
    <div className={` h-fit w-fit lg:rounded-2xl rounded-xl flex lg:flex-row flex-col z-0 hover:scale-99 transition-all duration-500`}>
      <MapContainer
        center={userPosition}
        zoom={14.5}
        scrollWheelZoom={true}
        className="lg:rounded-4xl rounded-2xl md:w-180 sm:w-88 w-75 lg:h-120 h-90 lg:shadow-stone-700 lg:shadow-lg shadow-none lg:m-2 m-0"
      >
        <TileLayer
          attribution='<a href="https://asiqueehety.vercel.app" target="_blank">Asique Ehety</a>'
          //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url={process.env.NEXT_PUBLIC_MAP_URL}

        />
        <MarkerLayer />
      </MapContainer>
    </div>
  );
}