export default function avg_location(arr)
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
