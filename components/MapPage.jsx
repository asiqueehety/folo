import Script from 'next/script'

export default function MapPage() {
  return (
    <>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""></script>
        <div id="map" style={{ height: '500px' }}></div>
    </>
  )
}
