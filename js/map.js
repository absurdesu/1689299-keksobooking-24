import {createCard} from './card.js';
import {getData} from './api.js';
import {filterCards, selectFilters} from './filter.js';
import {debounce} from './util.js';
import {showAlert} from './alert.js';
import {setFormSubmit, setFormDefault} from './form.js';
import {changeFormState, changeFiltersState} from './state-change.js';

const ZOOM = 13;

const TOKYO_CENTER = {
  lat: 35.67333,
  lng: 139.72755,
};

const bookingMap = L.map('map-canvas');
const markersLayer = L.layerGroup().addTo(bookingMap);

const mainPinIcon = L.icon({
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
    icon: mainPinIcon,
  },
);

const adressInput = document.querySelector('#address');

const setAddressInputValue = () => {
  adressInput.value = `${TOKYO_CENTER.lat}, ${TOKYO_CENTER.lng}`;
};

const addMainPin = () => {
  mainPinMarker.on('moveend', (evt) => {
    const markerTarget = evt.target;
    adressInput.value = `${markerTarget.getLatLng().lat.toFixed(5)}, ${markerTarget.getLatLng().lng.toFixed(5)}`;
  }).addTo(bookingMap);
};

const createMarker = (func, point) => {
  const {lat, lng} = point;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({lat, lng}, {icon});

  marker.addTo(markersLayer);
  marker.bindPopup(func);
};

const makeMarkers = (cards) => {
  markersLayer.clearLayers();
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
  bookingMap.setView({lat: TOKYO_CENTER.lat, lng: TOKYO_CENTER.lng}, ZOOM);
};

const closeOpenedPopup = () => {
  bookingMap.closePopup();
};

const addMap = () => {
  bookingMap.on('load', () => {
    setAddressInputValue();
    changeFormState(true);
    addMainPin();
    getData((pins) => {
      makeMarkers(filterCards(pins));
      changeFiltersState(true);
      selectFilters(debounce(() => makeMarkers(filterCards(pins)), 500));
      setFormSubmit(setFormDefault);
    }, showAlert);
  });
  bookingMap.setView({lat: TOKYO_CENTER.lat, lng: TOKYO_CENTER.lng}, ZOOM);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(bookingMap);
};

export {addMap, resetMainPin, closeOpenedPopup};
