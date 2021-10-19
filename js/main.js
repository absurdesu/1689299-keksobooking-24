import {TITLES, DESCRIPTIONS, LODGING_TYPES, CHECKIN_CHECKOUT_TIMES, FEATURES, PHOTOS} from './data.js';
import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomArray} from './util.js';

const AD_COUNT = 10;

const avatarNumbers = Array.from({length: 10}, (elementValue, elementIndex) => elementIndex + 1);

const createAd = () => {
  const latitude = getRandomPositiveFloat(35.65, 35.7, 5);
  const longitude = getRandomPositiveFloat(139.7, 139.8, 5);
  return {
    author: {
      avatar: `img/avatars/user${String(avatarNumbers.shift()).padStart(2, '0')}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(1, 10000),
      type: getRandomArrayElement(LODGING_TYPES),
      rooms: getRandomPositiveInteger(1, 4),
      guests: getRandomPositiveInteger(1, 12),
      checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
      checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  };
};

const similarAds = Array.from({length: AD_COUNT}, createAd);

similarAds;
