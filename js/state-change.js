import {adForm, activeFormElements, mapFilters, activeFilterElements} from './form.js';

const changeElementState = (elements, isDisabled) => {
  elements.forEach((element) => element.disabled = isDisabled);
};

const changeFormState = (isActive) => {
  if (isActive) {
    adForm.classList.remove('ad-form--disabled');
    changeElementState(activeFormElements, false);
  } else {
    adForm.classList.add('ad-form--disabled');
    changeElementState(activeFormElements, true);
  }
};

const changeFiltersState = (isActive) => {
  if (isActive) {
    mapFilters.classList.remove('map__filters--disabled');
    changeElementState(activeFilterElements, false);
  } else {
    mapFilters.classList.add('map__filters--disabled');
    changeElementState(activeFilterElements, true);
  }
};

export {changeFormState, changeFiltersState};
