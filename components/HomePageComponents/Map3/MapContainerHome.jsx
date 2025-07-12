'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import MapLoading from './../../reusables/MapLoading';
import LostPopup from './LostPopup';
import FoundPopup from './FoundPopup';
import getDistance from '../../../lib/get_distance';

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
export default function MapContainerHome(props) {
  const [userPosition, setUserPosition] = useState(null);
  const [userLocation, setUserLocation] = useState({});
  const [markers, setMarkers] = useState([]);
  const [lost_posts, set_lost_posts] = useState()
  const [found_posts, set_found_posts] = useState()
  const [lostlocs, set_lostlocs] = useState([])
  const [foundlocs, set_foundlocs] = useState([])
  const [darkmode,set_darkmode] = useState(false)
  const [showPostLocations, setShowPostLocations] = useState(false)
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
          setUserLocation({lat:pos.coords.latitude,lng:pos.coords.longitude});
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
    if (props.posts) {
      set_lost_posts(props.posts.lost_posts)
      set_found_posts(props.posts.found_posts)
      set_darkmode(props.darkmode)
      setShowPostLocations(props.showPostLocations)
    }
  }, [props.posts, props.darkmode, props.showPostLocations]);

  useEffect(() => {
    if (
      userPosition &&
      Array.isArray(userPosition) &&
      typeof userPosition[0] === 'number' &&
      typeof userPosition[1] === 'number' &&
      (lost_posts || found_posts)
    ) {
      setting_function_for_posts();
    }
  }, [userPosition, lost_posts, found_posts]);
  
  async function setting_function_for_posts() {
    if (found_posts) {
      const foundLocs = await Promise.all(
        found_posts.map(async post => {
          const _lat = post.content_location[0].lat;
          const _lng = post.content_location[0].lng;
          // const place_name = await get_placename(_lat, _lng);
          const distance = getDistance({lat: userPosition[0], lng: userPosition[1]}, {lat: _lat, lng: _lng});
          return {
            lat: _lat,
            lng: _lng,
            post_id: post._id,
            post_name: post.content_name,
            post_type: post.content_type,
            post_pic: post.content_pic,
            distance: distance,
          };
        })
      );
      set_foundlocs(foundLocs);
    }
  
    if (lost_posts) {
      const lostLocs = await Promise.all(
        lost_posts.map(async post => {
          const avg_loc = avg_location(post.content_location);
          // const place_name = await get_placename(avg_loc.lat, avg_loc.lng);
          const distance = getDistance({lat: userPosition[0], lng: userPosition[1]}, {lat: avg_loc.lat, lng: avg_loc.lng});
          return {
            lat: avg_loc.lat,
            lng: avg_loc.lng,
            post_id: post._id,
            post_name: post.content_name,
            post_type: post.content_type,
            post_pic: post.content_pic,
            post_reward: post.finder_reward,
            distance: distance,
          };
        })
      );
      set_lostlocs(lostLocs);
    }
  }

  function MarkerLayer() {
    const map = useMap();
    useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setUserPosition(e.latlng)
        map.flyTo(!showPostLocations? e.latlng : [avg_location(showPostLocations.content_location).lat, avg_location(showPostLocations.content_location).lng], !!showPostLocations? 16 : 14.5)
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
        {!showPostLocations && foundlocs.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false} icon={customIcon2}>
            <Popup>
              <FoundPopup post_name={pos.post_name} post_type={pos.post_type} post_pic={pos.post_pic} post_distance={pos.distance}/>
            </Popup>
          </Marker>
        ))}
        {!showPostLocations && lostlocs.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false} icon={customIcon3}>
            <Popup>
              <LostPopup post_name={pos.post_name} post_type={pos.post_type} post_pic={pos.post_pic} post_reward={pos.post_reward} post_distance={pos.distance}/>
            </Popup>
          </Marker>
        ))}
        {showPostLocations && showPostLocations.content_location.length==1 && showPostLocations.content_location.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false} icon={customIcon2}>
            <Popup>
              <FoundPopup post_name={showPostLocations.content_name} post_type={showPostLocations.content_type} post_pic={showPostLocations.content_pic} post_distance={getDistance({lat: userPosition[0], lng: userPosition[1]}, {lat: pos.lat, lng: pos.lng})}/>
            </Popup>
          </Marker>
        ))} 
        {showPostLocations && showPostLocations.content_location.length > 1 && showPostLocations.content_location.map((pos, i) => (
          <Marker key={i} position={pos} draggable={false} icon={customIcon3}>
            <Popup>
              <LostPopup post_name={showPostLocations.content_name} post_type={showPostLocations.content_type} post_pic={showPostLocations.content_pic} post_reward={showPostLocations.finder_reward} post_distance={getDistance({lat: userPosition[0], lng: userPosition[1]}, {lat: pos.lat, lng: pos.lng})}/>
            </Popup>
          </Marker>
        ))}
      </>
    );
  }
  if (!userPosition) {
    return <div className='flex m-auto'><MapLoading/></div>;
  }
  return (
    <div className={` h-fit w-fit lg:rounded-2xl rounded-xl flex lg:flex-row flex-col z-0 hover:scale-99 transition-all duration-500 ${darkmode? 'bg-neutral-800' : 'bg-white'}`}>
      <MapContainer
        center={!!showPostLocations? [avg_location(showPostLocations.content_location).lat, avg_location(showPostLocations.content_location).lng] : userPosition}
        zoom={!!showPostLocations? 17 : 14.5}
        scrollWheelZoom={true}
        className="lg:rounded-4xl rounded-2xl md:w-180 sm:w-88 w-75 lg:h-140 h-90 lg:shadow-stone-700 lg:shadow-lg shadow-none lg:m-2 m-0"
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