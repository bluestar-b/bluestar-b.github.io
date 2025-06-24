import DottedMap from "dotted-map/without-countries";
import cities from "cities.json" with { type: "json" };

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestCity(lat, lng) {
  let closestCity = null;
  let minDist = Infinity;

  for (const city of cities) {
    const dist = haversine(lat, lng, city.lat, city.lng);
    if (dist < minDist) {
      closestCity = city;
      minDist = dist;
    }
  }

  return closestCity;
}

/*
const lat = 14.751832;
const lng = 100.671795;

const city = findNearestCity(lat, lng);
console.log(city)

*/

async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  });
}

async function loadAndRenderMap() {
  try {
    const res = await fetch("/map.json");
    if (!res.ok) throw new Error("Failed to load map.json");

    const mapData = await res.json();
    const map = new DottedMap({ map: mapData, height: 60 });
    const userLocation = await getUserLocation();

    const city = findNearestCity(userLocation.lat, userLocation.lng);
    console.log(city);

    document.getElementById("map-label").innerHTML =
      `${city.name}, ${city.country}`;
    map.addPin({
      lat: userLocation.lat,
      lng: userLocation.lng,
      svgOptions: {
        radius: 0.8,
        color: "#FF9F0A",
      },
    });

    const svgMap = map.getSVG({
      radius: 0.3,
      shape: "circle",
      color: "#827670",
      backgroundColor: "transparent",
    });

    const img = document.createElement("img");
    img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`;

    const container = document.getElementById("map-content");

    if (container) {
      container.appendChild(img);
    } else {
      console.warn("Target container not found!");
    }
  } catch (err) {
    console.error("Error loading or rendering map:", err);
  }
}

loadAndRenderMap();

let is24Hour = false;

function getShortTimezoneOffset() {
  const offsetMinutes = new Date().getTimezoneOffset();
  const offsetHours = -offsetMinutes / 60;
  return (offsetHours >= 0 ? "+" : "") + offsetHours;
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const offset = getShortTimezoneOffset();

  let suffix = "";
  if (!is24Hour) {
    suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  }

  const timeString = `${String(hours).padStart(2, "0")}:${minutes}:${seconds}${is24Hour ? "" : " " + suffix} ${offset}`;
  document.getElementById("time").textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

document.getElementById("time").addEventListener("click", () => {
  is24Hour = !is24Hour;
  updateClock();
});

document.getElementById("map-label").addEventListener("click", () => {
  const el = document.documentElement;

  if (!document.fullscreenElement) {
    el.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
});
