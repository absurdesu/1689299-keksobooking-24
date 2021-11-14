const LODGING_TYPES_RUS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardElementTitle = cardElement.querySelector('.popup__title');
  cardElementTitle.textContent = `${card.offer.title}`;

  const cardElementAddress = cardElement.querySelector('.popup__text--address');
  cardElementAddress.textContent = `${card.offer.address}`;

  const cardElementPrice = cardElement.querySelector('.popup__text--price');
  cardElementPrice.textContent = `${card.offer.price} ₽/ночь`;

  const cardElementType = cardElement.querySelector('.popup__type');
  cardElementType.textContent = LODGING_TYPES_RUS[card.offer.type];

  const cardElementCapacity = cardElement.querySelector('.popup__text--capacity');
  cardElementCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;

  const cardElementTime = cardElement.querySelector('.popup__text--time');
  cardElementTime.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  const cardElementFeatures = cardElement.querySelector('.popup__features');
  cardElementFeatures.textContent = `${card.offer.features}`;

  const cardElementDescription = cardElement.querySelector('.popup__description');
  cardElementDescription.textContent = `${card.offer.description}`;

  const cardPhotos = cardElement.querySelector('.popup__photos');
  const getCardPhotos = card.offer.photos.map((photo) => {
    const cardPhoto = document.createElement('img');
    cardPhoto.src = photo;
    cardPhoto.classList.add('popup__photo');
    return cardPhoto;
  });
  cardPhotos.append(...getCardPhotos);

  const cardAvatar = cardElement.querySelector('.popup__avatar');
  cardAvatar.src = `${card.author.avatar}`;

  mapCanvas.appendChild(cardElement);
};

const createCards = (cards) => {
  cards.forEach((card) => {
    createCard(card);
  });
};

export {createCards};
