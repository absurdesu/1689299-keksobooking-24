import {onRoomsNumberChange} from './form.js';
import {changeFormState, changeFiltersState} from './state-change.js';
import {addMap} from './map.js';

changeFormState();
changeFiltersState();
onRoomsNumberChange();

addMap();
