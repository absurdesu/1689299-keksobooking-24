const LODGING_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const hiddenCheck = (template, element, data, text) => {
  if (data) {
    template.querySelector(element).textContent = text;
  } else {
    template.querySelector(element).classList.add('hidden');
  }
};

const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);

  hiddenCheck(cardElement, '.popup__title', card.offer.title, `${card.offer.title}`);
  hiddenCheck(cardElement, '.popup__text--address', card.offer.address, `${card.offer.address}`);
  hiddenCheck(cardElement, '.popup__text--price', card.offer.price, `${card.offer.price} ₽/ночь`);
  hiddenCheck(cardElement, '.popup__type', card.offer.type, LODGING_TYPES[card.offer.type]);
  hiddenCheck(cardElement, '.popup__text--capacity', card.offer.rooms && card.offer.guests, `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`);
  hiddenCheck(cardElement, '.popup__text--time', card.offer.checkin && card.offer.checkout, `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`);

  if (card.offer.features) {
    const cardFeatures = cardElement.querySelector('.popup__features');
    cardFeatures.innerHTML = '';
    const features = card.offer.features.map((feature) => {
      const newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature');
      newFeature.classList.add(`popup__feature--${feature}`);
      return newFeature;
    });
    cardFeatures.append(...features);
  } else {
    cardElement.querySelector('.popup__features').classList.add('hidden');
  }

  hiddenCheck(cardElement, '.popup__description', card.offer.description, `${card.offer.description}`);

  if (card.offer.photos) {
    const cardPhotos = cardElement.querySelector('.popup__photos');
    cardPhotos.innerHTML = '';
    const pictures = card.offer.photos.map((photo) => {
      const picture = document.createElement('img');
      picture.src = photo;
      picture.width = 45;
      picture.height = 40;
      picture.classList.add('popup__photo');
      return picture;
    });
    cardPhotos.append(...pictures);
  } else {
    cardElement.querySelector('.popup__photo').classList.add('hidden');
  }

  if (card.author.avatar) {
    cardElement.querySelector('.popup__avatar').src = `${card.author.avatar}`;
  } else {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  return cardElement;
};

const createCards = (cards) => {
  cards.forEach((card) => {
    createCard(card);
  });
};

export {createCard, createCards};
