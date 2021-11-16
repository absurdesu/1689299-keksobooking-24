import {changeFormState, setFormDefault, setFormSubmit, roomNumberChange} from './form.js';
import {MAP, addMap, addMainPin, makeMarkers} from './map.js';
import {getData} from './api.js';
import {selectFilters, filterCards} from './filter.js';
import {showAlert} from './alert.js';
import {debounce} from './util.js';

changeFormState();
roomNumberChange();
addMap();
addMainPin();

MAP.whenReady(() => {
  changeFormState(true);
  getData((pins) => {
    makeMarkers(filterCards(pins));
    selectFilters(debounce(() => makeMarkers(filterCards(pins)), 500));
    setFormSubmit(setFormDefault);
  }, showAlert);
});
