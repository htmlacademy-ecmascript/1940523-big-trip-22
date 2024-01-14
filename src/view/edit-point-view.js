import AbstractView from '../framework/view/abstract-view.js';
import { EVENT_TYPES } from '../constants.js';
import { getRandomBool } from '../utils/common.js';

function createDestinationOptionTemplate(destinations) {
  return destinations.map((destination) => (
    `
      <option value="${destination.name}">${destination.name}</option>
    `
  )).join('');
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

function createOfferItems(offer) {
  const {id, title, price} = offer;
  const checked = getRandomBool() ? 'checked' : '';

  return `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${checked}>
                  <label class="event__offer-label" for="event-offer-${id}-1">
                    <span class="event__offer-title">${title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${price}</span>
                  </label>
                </div>`;
}

function createOfferItemsList (offers) {
  if (offers.length !== 0) {
    return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">

                 ${offers.map((offer) => createOfferItems(offer)).join('')}

              </div>
            </section>`;
  }
}

function createEditFormTemplate(destinations, destination, eventPoint, offers) {
  const { name, description } = destination;
  const { basePrice, dateFrom, dateTo, type, id } = eventPoint;
  const dateFromCurr = new Date(dateFrom).toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
  });
  const dateToCurr = new Date(dateTo).toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false,
  });

  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                    ${createEventType(EVENT_TYPES)}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${id}">

                ${type}

              </label>
              <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value=${name} list="destination-list-${id}">
              <datalist id="destination-list-1">

                ${createDestinationOptionTemplate(destinations)}

              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromCurr}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToCurr}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">

            ${createOfferItemsList(offers)}

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${description}</p>
            </section>
          </section>
        </form>
      </li>`
  );
}

export default class EditPointView extends AbstractView {
  #destinations = [];
  #offers = [];
  #onCloseClick = null;
  #onSaveEdit = null;
  #destination = null;
  #eventPoint = null;

  constructor({destinations, destination, eventPoint, offers, onCloseClick, onSaveEdit}) {
    super();
    this.#destinations = destinations;
    this.#destination = destination;
    this.#eventPoint = eventPoint;
    this.#offers = offers;
    this.#onCloseClick = onCloseClick;
    this.#onSaveEdit = onSaveEdit;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCloseClick);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveEditForm);
  }

  get template() {
    return createEditFormTemplate(this.#destinations, this.#destination, this.#eventPoint, this.#offers);
  }

  #saveEditForm = (evt) => {
    evt.preventDefault();
    this.#onSaveEdit(this.#eventPoint);
  };
}
