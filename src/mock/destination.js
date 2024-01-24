import { getRandomArrayElement, getRandomNumber } from '../utils/common.js';
import { DESCRIPTIONS, CITIES, MAX_IMAGES_COUNT } from '../constants.js';

export const generateDestination = () => {
  const city = getRandomArrayElement(CITIES);

  return ({
    id: crypto.randomUUID(),
    name: city,
    description: `It is ${city} description. ${DESCRIPTIONS}`,
    pictures: Array.from({length: getRandomNumber(MAX_IMAGES_COUNT)}, () => ({
      src: `https://loremflickr.com/666/666?${crypto.randomUUID()}`,
      description: `It is ${city} description`
    })),
  });
};
