import { getRandomBool, getRandomNumber } from '../utils/common.js';
import { MAX_PRICE_VALUE } from '../constants.js';
import { getDate } from '../utils/point.js';

export const generateEventPoint = (type, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomNumber(MAX_PRICE_VALUE),
  dateFrom: getDate({
    next: false
  }),
  dateTo: getDate({
    next: true
  }),
  destination: destinationId,
  isFavorite: getRandomBool(),
  offers: offerIds,
  type
});
