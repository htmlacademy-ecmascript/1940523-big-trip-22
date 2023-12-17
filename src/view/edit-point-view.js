import { createElement } from '../render.js';
import {DESCRIPTIONS, EVENT_TYPES, MAX_PRICE_VALUE} from '../constants.js';
import {getElementByKey, getRandomArrayElement, getRandomBool, getRandomNumber} from '../utils';

function createDestinationOption(destination) {
  return `
      <option value="${destination.name}">${destination.name}</option>
  `;
}

function createEventType(eventTypes) {
  return eventTypes.map((type) => {
    const toLowerType = type.toLowerCase();
    return `<div class="event__type-item">
              <input id="event-type-${toLowerType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${toLowerType}">
              <label class="event__type-label  event__type-label--${toLowerType}" for="event-type-${toLowerType}-1">${type}</label>
            </div>`;
  }).join('');
}

function createOfferItems(offers) {
  return offers.map((offer) => {
    return `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${getRandomBool() ? 'checked' : ''}>
                  <label class="event__offer-label" for="event-offer-${offer.id}-1">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>`;
  }).join('');
}

function createEditFormTemplate(destinations, offers) {
  const { name } = destinations[0];
  const currentEvent = 'Flight';
  const currentEventType = currentEvent.toLowerCase();
  const dateFrom = new Date().toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
  });
  const dateTo = new Date(2024, 0, 1, 2, 3, 4).toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
  });
  const currentPrice = getRandomNumber(MAX_PRICE_VALUE);
  const currentDescription = getRandomArrayElement(DESCRIPTIONS);
  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                    ${createEventType(EVENT_TYPES)}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">

                ${currentEvent}

              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${name} list="destination-list-1">
              <datalist id="destination-list-1">

                ${destinations.map(createDestinationOption).join('')}

              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${currentPrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">

                ${createOfferItems(getElementByKey(offers, currentEventType))}

              </div>
            </section>

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${currentDescription}</p>
            </section>
          </section>
        </form>
      </li>`
  );
}

export default class EditPointView {
  constructor({destinations, offers}) {
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createEditFormTemplate(this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
