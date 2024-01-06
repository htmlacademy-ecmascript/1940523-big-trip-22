import {generateOffer} from '../mock/offers.js';
import {generateDestination} from '../mock/destination.js';
import {generateEventPoint} from '../mock/event-points.js';
import {EVENT_TYPES, CITIES, OFFERS_COUNT} from '../constants.js';
import {getRandomArrayElement, getRandomNumberFromRange} from '../utils.js';

export default class MockService {
  destinations = [];
  offers = [];
  eventPoints = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.eventPoints = this.generateEventPoints();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getEventPoints() {
    return this.eventPoints;
  }

  generateDestinations() {
    return Array.from({length: CITIES.length}, generateDestination);
  }

  generateOffers() {
    return EVENT_TYPES.map((type) => ({
      type,
      offers: Array.from({length: getRandomNumberFromRange(OFFERS_COUNT.MIN, OFFERS_COUNT.MAX)}, generateOffer)
    }));
  }

  generateEventPoints() {
    return Array.from({length: EVENT_TYPES.length}, () => {
      const type = getRandomArrayElement(EVENT_TYPES);
      const destination = getRandomArrayElement(this.destinations);
      const offersByType = this.offers.find((offer) => offer.type === type);

      const randomOffers = new Set();

      Array.from({length: getRandomNumberFromRange(1, offersByType.offers.length)}, () => {
        randomOffers.add(getRandomArrayElement(offersByType.offers));
      });
      const hasOffers = (randomOffers.size > 0 && [...randomOffers][0]);
      const offerIds = hasOffers ? [...randomOffers].map((offer) => offer.id) : [];
      return generateEventPoint(type, destination.id, offerIds);
    });
  }
}
