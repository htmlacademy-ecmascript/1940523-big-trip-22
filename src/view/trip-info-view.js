import AbstractView from '../framework/view/abstract-view.js';
import {getFullTrip, getTripFullCost, getTripPeriod} from '../utils/common.js';

const TripInfoTemplate = ({route, duration, cost, isEmpty}) =>
  isEmpty
    ? `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Loading...</h1>
        <p class="trip-info__dates">Loading...</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
      </p>
    </section>`
    : `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>
        <p class="trip-info__dates">${duration}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`;

export default class TripInfoView extends AbstractView {
  #destinations = [];
  #points = [];
  #offers = [];

  constructor({destinations, points, offers}) {
    super();
    this.#destinations = destinations;
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return TripInfoTemplate({
      isEmpty: this.#points.length === 0,
      route: getFullTrip(this.#points, this.#destinations),
      duration: getTripPeriod(this.#points),
      cost: getTripFullCost(this.#points, this.#offers),
    });
  }
}
