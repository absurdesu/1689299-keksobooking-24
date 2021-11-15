import {changeElementState} from './util.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './alert.js';
import {resetMainPin, closeOpenedPopup} from './map.js';

const lodgingMinPrice = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const roomCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const activeElements = document.querySelectorAll('.ad-form fieldset, .map__filter, .map__features');
const priceInput = adForm.querySelector('#price');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelectorAll('#capacity option');
const typeSelect = adForm.querySelector('#type');
const checkinSelect = adForm.querySelector('#timein');
const checkoutSelect = adForm.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');

const changeFormState = (isActive) => {
  if (isActive) {
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    changeElementState(activeElements, false);
  } else {
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    changeElementState(activeElements, true);
  }
};

typeSelect.addEventListener('change', () => {
  priceInput.min = lodgingMinPrice[typeSelect.value];
  priceInput.placeholder = priceInput.min;
});

checkinSelect.addEventListener('change', () => {
  checkoutSelect.value = checkinSelect.value;
});

checkoutSelect.addEventListener('change', () => {
  checkinSelect.value = checkoutSelect.value;
});

const capacityChange = () => {
  for (const capacityOption of capacitySelect) {
    if (!capacityOption.disabled) {
      capacityOption.selected = true;
      return;
    }
  }
};

const roomNumberChange = () => {
  capacitySelect.forEach((capacityOption) => {
    capacityOption.disabled = !roomCapacity[roomNumberSelect.value].includes(capacityOption.value);
  });
  capacityChange();
};

roomNumberSelect.addEventListener('change', roomNumberChange);

const setFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        onSuccess();
        showSuccessMessage();
      },
      showErrorMessage,
      new FormData(evt.target),
    );
  });
};

const onTypesChange = () => {
  priceInput.min = lodgingMinPrice[typeSelect.value];
  priceInput.placeholder = priceInput.min;
};

const setFormDefault = () => {
  adForm.reset();
  mapFilters.reset();
  onTypesChange();
  resetMainPin();
  closeOpenedPopup();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setFormDefault();
});

export {changeFormState, setFormSubmit, setFormDefault};
