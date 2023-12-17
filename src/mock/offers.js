import {incrementCounter, getRandomArrayElement, getRandomNumber} from '../utils.js';
import {EVENT_TYPES, START_ID_COUNTER, MAX_PRICE_VALUE, OFFERS_TITLES, MAX_OFFERS_COUNT} from '../constants.js';

const getOfferId = incrementCounter(START_ID_COUNTER);

export const createOffer = () => {
  const ID = getOfferId();

  return {
    id: ID.toString(),
    title: getRandomArrayElement(OFFERS_TITLES),
    price: getRandomNumber(MAX_PRICE_VALUE)
  };
};

export const getOffers = () => {
  const offersList = {};
  for (const type in EVENT_TYPES) {
    offersList[EVENT_TYPES[type]] = Array.from({length: getRandomNumber(MAX_OFFERS_COUNT)}, createOffer);
  }

  return offersList;
};
