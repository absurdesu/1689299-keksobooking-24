const TITLES = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  'Aliquam tincidunt mauris eu risus',
  'Vestibulum auctor dapibus neque',
  'Nunc dignissim risus id metus',
  'Cras ornare tristique elit',
  'Vivamus vestibulum ntulla nec ante',
  'Praesent placerat risus quis eros',
  'Fusce pellentesque suscipit nibh',
  'Integer vitae libero ac risus egestas placerat',
  'Vestibulum commodo felis quis tortor',
  'Ut aliquam sollicitudin leo',
  'Cras iaculis ultricies nulla',
  'Donec quis dui at dolor tempor interdum',
];

const DESCRIPTIONS = [
  'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat',
  'Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.',
  'Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.',
  'Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.',
  'Sed adipiscing ornare risus. Morbi est est, blandit sit amet, sagittis vel, euismod vel, velit. Pellentesque egestas sem. Suspendisse commodo ullamcorper magna.',
  'Nulla sed leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
  'Fusce lacinia arcu et nulla. Nulla vitae mauris non felis mollis faucibus.',
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.',
  'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
  'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.',
];

const LODGING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomPositiveInteger = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (firstNumber, secondNumber, digits = 1) => {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const shuffleArray = (array) => {
  for (let firstElement = array.length -1; firstElement > 0; firstElement--) {
    const secondElement = Math.floor(Math.random() * (firstElement + 1));
    [array[firstElement], array[secondElement]] = [array[secondElement], array[firstElement]];
  }
  return array;
};

const avatarNumbers = Array.from({length: 10}, (elementValue, elementIndex) => elementIndex + 1);

const getFeatures = () => {
  const shuffled = shuffleArray(FEATURES);
  return shuffled.slice(0, getRandomPositiveInteger(0, FEATURES.length - 1));
};

const getPhotos = () => {
  const shuffled = shuffleArray(PHOTOS);
  return shuffled.slice(0, getRandomPositiveInteger(0, FEATURES.length - 1));
};

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
      features: getFeatures(),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getPhotos(),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  };
};

const AD_COUNT = 10;

const similarAds = Array.from({length: AD_COUNT}, createAd);

similarAds;
