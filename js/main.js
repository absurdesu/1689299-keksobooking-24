import {changeFormState, setFormDefault, setFormSubmit} from './form.js';
import {MAP, addMap, addMainPin, makeMarkers} from './map.js';
import {getData} from './api.js';
import {selectFilters, filterCards} from './filter.js';
import {showAlert} from './alert.js';
import {debounce} from './util.js';

changeFormState();
addMap();
addMainPin();

MAP.whenReady(() => {
  getData((pins) => {
    makeMarkers(filterCards(pins));
    selectFilters(debounce(() => makeMarkers(filterCards(pins)), 500));
    changeFormState(true);
    setFormSubmit(setFormDefault);
  }, showAlert);
});
