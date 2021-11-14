import {changeElementState} from './util.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const activeElements = document.querySelectorAll('.ad-form fieldset, .map__filter, .map__features');

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

export {changeFormState};
