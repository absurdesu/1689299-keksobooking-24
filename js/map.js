import {createCard} from './card.js';

const MAP = L.map('map-canvas');
const MARKERS_LAYER = L.layerGroup().addTo(MAP);
const ZOOM = 13;

const TOKYO_CENTER = {
  lat: 35.67333,
  lng: 139.72755,
};

const MAIN_PIN_ICON = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: TOKYO_CENTER.lat,
    lng: TOKYO_CENTER.lng,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

const adressInput = document.querySelector('#address');

const setAddressInputValue = () => {
  adressInput.value = `${TOKYO_CENTER.lat}, ${TOKYO_CENTER.lng}`;
};

const addMap = () => {
  MAP.on('load', () => {
    setAddressInputValue();
  });
  MAP.setView({lat: TOKYO_CENTER.lat, lng: TOKYO_CENTER.lng}, ZOOM);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(MAP);
};

const addMainPin = () => {
  mainPinMarker.on('moveend', (evt) => {
    const markerTarget = evt.target;
    adressInput.value = `${markerTarget.getLatLng().lat.toFixed(5)}, ${markerTarget.getLatLng().lng.toFixed(5)}`;
  }).addTo(MAP);
};

const createMarker = (func, point) => {
  const {lat, lng} = point;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({lat, lng}, {icon});

  marker.addTo(MARKERS_LAYER);
  marker.bindPopup(func);
};

const makeMarkers = (cards) => {
  MARKERS_LAYER.clearLayers();
  cards.forEach((card) => {
    createMarker(() => createCard(card), card.location);
  });
};

const resetMainPin = () => {
  mainPinMarker.setLatLng({
    lat: TOKYO_CENTER.lat,
    lng: TOKYO_CENTER.lng,
  });
  setAddressInputValue();
  MAP.setView({lat: TOKYO_CENTER.lat, lng: TOKYO_CENTER.lng}, ZOOM);
};

const closeOpenedPopup = () => {
  MAP.closePopup();
};

export {MAP, addMap, addMainPin, makeMarkers, resetMainPin, closeOpenedPopup};
