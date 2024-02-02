import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {EditType, EVENT_TYPES, POINT_EMPTY} from '../constants.js';
import {capitalizeFirstLetter } from '../utils/common.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createDestinationOptionTemplate(destinations) {
  return destinations.map((destination) => (
    `
      <option value="${destination}"></option>
    `
  )).join('');
}

function createEventTypeListTemplate(eventPointType) {
  return EVENT_TYPES.map((type) => (
    `
    <div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
        ${type === eventPointType ? 'checked' : ''}
      >
      <label
        class="event__type-label event__type-label--${type}"
        for="event-type-${type}-1"
      >
        ${capitalizeFirstLetter(type)}
      </label>
    </div>
    `
  )).join('');
}

function createEventTypeTemplate(eventType) {
  return (
    `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          ${createEventTypeListTemplate(eventType)}

        </fieldset>
      </div>
    </div>
    `
  );
}

function createDestinationPhotosTemplate(pictures) {
  return pictures.map((picture) => (
    `
    <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `
  )).join('');
}

function createButtonTemplate(isCreating, isDisabled, isDeleting) {
  if (isCreating) {
    return `
    <button class="event__reset-btn" type="reset">Cancel</button>
  `;
  }
  return `
    <button class="event__reset-btn" ${isDisabled ? 'disabled' : ''} type="reset">
        ${isDeleting ? 'Deleting...' : 'Delete'}
    </button>
    <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
    </button>
  `;
}

function createOfferItems(offer, isChecked) {
  const {id, title, price} = offer;
  const checked = isChecked ? 'checked' : '';

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" data-id="${id}" ${checked}>
            <label class="event__offer-label" for="event-offer-${title}-${id}">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`;
}

function createOfferItemsList(offers, checkedOffers) {
  if (offers.length) {
    return `<section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">

                 ${offers?.map((offer) => createOfferItems(offer, checkedOffers?.includes(offer.id))).join('')}

              </div>
            </section>`;
  }
}

function createDestinationTemplate (currentDestination) {
  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${currentDestination.description}</p>
          </section>
          ${currentDestination.pictures ? `
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createDestinationPhotosTemplate(currentDestination.pictures)}
            </div>
          </div>
          ` : ''}`;
}

function createEditFormTemplate({ state, pointDestinations, pointOffers, editorMode}) {
  const { basePrice, dateFrom, dateTo, type, id, destination, isDisabled, isSaving, isDeleting } = state;
  const isCreating = editorMode === EditType.CREATING;
  const selectedDestination = pointDestinations.find((item) => item.id === destination);
  const selectedDestinationName = selectedDestination ? selectedDestination.name : '';
  const currentPointOffers = pointOffers.find((offer) => offer.type === type);
  const listCities = pointDestinations.map(({name}) => name);
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

            ${type ? createEventTypeTemplate(type) : ''}

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-${id}">

                ${type}

              </label>
              <input class="event__input  event__input--destination" id="event-destination-${id}"
              type="text"
              name="event-destination"
              value="${selectedDestinationName}"
              list="destination-list-1">
              <datalist id="destination-list-1">

                ${createDestinationOptionTemplate(listCities)}

              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${isCreating ? '' : dateFromCurr}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${isCreating ? '' : dateToCurr}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" pattern="\\d*">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
            ${createButtonTemplate(isCreating, isDisabled, isDeleting)}
          </header>
          <section class="event__details">

            ${createOfferItemsList(currentPointOffers.offers, state.offers)}

            ${selectedDestination ? createDestinationTemplate(selectedDestination) : ''}

          </section>
        </form>
      </li>`
  );
}

export default class EditPointView extends AbstractStatefulView {
  #destinations = [];
  #pointOffers = [];
  #onCloseClick = null;
  #onDeleteClick = null;
  #onSaveEdit = null;
  #datePickerFrom = null;
  #datePickerTo = null;
  #editorMode = null;

  constructor({destinations, eventPoint = POINT_EMPTY, pointOffers, onCloseClick, onSaveEdit, onDeleteClick, editorMode = EditType.EDITING }) {
    super();
    this.#destinations = destinations;
    this.#pointOffers = pointOffers;
    this.#onCloseClick = onCloseClick;
    this.#onSaveEdit = onSaveEdit;
    this.#onDeleteClick = onDeleteClick;
    this.#editorMode = editorMode;
    this._setState(EditPointView.parsePointToState(eventPoint));
    this._restoreHandlers();
  }

  get template() {
    return createEditFormTemplate({
      state: this._state,
      pointDestinations: this.#destinations,
      pointOffers: this.#pointOffers,
      editorMode: this.#editorMode,
    });
  }

  #saveEditForm = (evt) => {
    evt.preventDefault();
    this.#onSaveEdit(EditPointView.parseStateToPoint(this._state));
  };

  removeElement = () => {
    super.removeElement();
    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }
    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  };

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers = () => {
    if (this.#editorMode === EditType.EDITING) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCloseClick);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    }
    if (this.#editorMode === EditType.CREATING) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCloseClick);
    }
    this.element.querySelector('.event.event--edit').addEventListener('submit', this.#saveEditForm);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationOptionHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);

    this.#setDatePickers();
  };

  #offersChangeHandler = () => {
    const checkedOffers = this.element.querySelectorAll('.event__offer-checkbox:checked');

    this._setState({
      ...this._state,
      offers: [...checkedOffers].map((item) => item.dataset.id)
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      ...this._state,
      basePrice: evt.target.value,
    });
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick(this._state);
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      ...this._state,
      type: evt.target.value,
      offers: [],
    });
  };

  #destinationOptionHandler = (evt) => {
    const selectedDestination = this.#destinations.find((item) => item.name === evt.target.value);
    const selectedDestinationId = selectedDestination ? selectedDestination.id : null;
    this.updateElement({
      ...this._state,
      destination: selectedDestinationId,
    });
  };

  #setDatePickers = () => {
    const startDateNode = this.element.querySelector('.event__input--time[name="event-start-time"]');

    const endDateNode = this.element.querySelector('.event__input--time[name="event-end-time"]');

    const flatPickerConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true,
    };

    this.#datePickerFrom = flatpickr(startDateNode, {
      ...flatPickerConfig,
      defaultDate: this._state.dateFrom,
      onChange: this.#closeStartDateHandler,
      maxDate: this._state.dateTo,
    });

    this.#datePickerTo = flatpickr(endDateNode, {
      ...flatPickerConfig,
      defaultDate: this._state.dateTo,
      onChange: this.#closeEndDateHandler,
      minDate: this._state.dateFrom,
    });
  };

  #closeStartDateHandler = ([selectedDate]) => {
    this._setState({
      ...this._state,
      dateFrom: selectedDate
    });

    this.#datePickerTo.set('minDate', this._state.dateFrom);
  };

  #closeEndDateHandler = ([selectedDate]) => {
    this._setState({
      ...this._state,
      dateTo: selectedDate
    });

    this.#datePickerFrom.set('maxDate', selectedDate);
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
