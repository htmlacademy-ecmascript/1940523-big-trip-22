import { getRandomNumber, getRandomArrayElement } from '../utils.js';
import { OFFERS_TITLES, MAX_PRICE_OFFER } from '../constants.js';

export const generateOffer = () => ({
  id: crypto.randomUUID(),
  title: getRandomArrayElement(OFFERS_TITLES),
  price: getRandomNumber(MAX_PRICE_OFFER),
});
