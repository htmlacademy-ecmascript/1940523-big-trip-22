import {incrementCounter, getRandomArrayElement, getRandomNumber} from '../utils.js';
import {DESCRIPTIONS, CITIES, START_ID_COUNTER, MAX_IMAGES_COUNT, EVENT_TYPES} from '../constants.js';

const getCityId = incrementCounter(START_ID_COUNTER);
const getImageId = incrementCounter(START_ID_COUNTER);

export const setupDestination = () => {
  const ID = getCityId();

  return {
    id: ID.toString(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: CITIES[ID - 1],
    pictures: Array.from({length: getRandomNumber(MAX_IMAGES_COUNT)}, () => ({
      src: `https://loremflickr.com/666/666?${getImageId()}`,
      description: getRandomArrayElement(DESCRIPTIONS)
    })),
  };
};

export const getDestinations = () =>
  Array.from(
    {
      length: EVENT_TYPES.length,
    },
    setupDestination
  );
