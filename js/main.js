import {createAd} from './data.js';
import {createCards} from './card.js';
import {changeFormState} from './form.js';

const AD_COUNT = 1;

const similarAds = Array.from({length: AD_COUNT}, createAd);

createCards(similarAds);

changeFormState();
