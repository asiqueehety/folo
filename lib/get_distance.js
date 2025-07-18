export default function getDistance(coord1, coord2) {
    const toRad = (value) => (value * Math.PI) / 180;
  
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = toRad(coord1.lat);
    const lon1 = toRad(coord1.lng);
    const lat2 = toRad(coord2.lat);
    const lon2 = toRad(coord2.lng);
  
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
  
    return distance.toFixed(2); // Return value in kilometers (rounded to 2 decimals)
  }
  