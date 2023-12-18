import {incrementCounter, getRandomArrayElement, getRandomBool, getRandomNumber} from '../utils.js';
import {
  CITIES,
  EVENT_TYPES,
  START_ID_COUNTER,
  MAX_PRICE_VALUE,
  MONTHS
} from '../constants.js';

const getCityId = incrementCounter(START_ID_COUNTER);

export const setupEventPoints = () => {
  const ID = getCityId();

  return {
    id: ID.toString(),
    basePrice: getRandomNumber(MAX_PRICE_VALUE),
    dateFrom: `2023-${getRandomArrayElement(MONTHS)}-08T20:41:04`,
    dateTo: `2023-${getRandomArrayElement(MONTHS)}-06T21:41:04`,
    destination: getRandomNumber(CITIES.length).toString(),
    isFavorite: getRandomBool(),
    offers: [
      '1',
      '2',
      '6',
      '10',
      '15',
    ],
    type: getRandomArrayElement(EVENT_TYPES),
  };
};

export const getEventPoint = () =>
  Array.from(
    {
      length: EVENT_TYPES.length,
    },
    setupEventPoints
  );
