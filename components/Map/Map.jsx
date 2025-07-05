import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState,useRef,useMemo,useCallback } from 'react';
import L, { latLng } from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})
export default function MapPage() {


  function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  function DraggableMarker() {
    const [position, setPosition] = useState([]);
    const markerRef = useRef(null);

    const map = useMapEvents({
      click(e) {
        if(position.length==0) map.locate(); // Get user's location on first click
        else if(position.length < 5){
          //how do i get the latlng of the clicked place in here?
            const { latlng } = e;
            setPosition((prev) => [...prev, latlng]);
            console.log(position);
        }
      },
      locationfound(e) {
        if(position.length==0)
        {
          setPosition((prev) => [...prev, e.latlng]);
          map.flyTo(e.latlng, map.getZoom());
          console.log(position);
        }
      },
    });
    // const eventHandlers = useMemo(() => ({
    //   dragend() {
    //     const marker = markerRef.current;
    //     if (marker != null) {
    //       const newPos = marker.getLatLng();
    //       console.log("Dragged to:", newPos);
    //     }
    //   },
    // }), []);

    // const eventHandlers = useMemo(
    //   () => ({
    //     dragend() {
    //       const marker = markerRef.current;
    //       if (marker != null) {
    //         const newPos = marker.getLatLng();
    //         setPosition(newPos);
    //         console.log("New position:", newPos);
    //       }
    //     },
    //   }),
    //   []
    // );

    // const toggleDraggable = useCallback(() => {
    //   setDraggable((d) => !d);
    // }, []);

    if (!position) return null;

    return (
      <>
      {position.map((pos,ind)=>
      (
        <Marker
        key={ind}
        draggable={true}
        // eventHandlers={eventHandlers}
        position={pos}
        ref={markerRef}
      >
        <Popup minWidth={90}>

        </Popup>
      </Marker>
      ))}
      </>
    )
  }



  return (
    <MapContainer center={[0,0]} zoom={30} scrollWheelZoom={true} className='rounded-4xl ml-30 mt-30'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker/>
    </MapContainer>
  )
}
