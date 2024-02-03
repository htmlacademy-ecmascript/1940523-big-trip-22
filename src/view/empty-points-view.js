import AbstractView from '../framework/view/abstract-view.js';
import {EmptyListMessage} from '../constants.js';

function createNoPointsTemplate({massage}) {
  return (
    `<p class="trip-events__msg">
      ${ massage }
    </p>`
  );
}

export default class NoPointView extends AbstractView {
  #filterType = null;
  #isServerError = null;

  constructor({filterType, isServerError = null}) {
    super();
    this.#filterType = filterType;
    this.#isServerError = isServerError;
  }

  get template() {
    if (this.#isServerError) {
      return createNoPointsTemplate({
        massage: EmptyListMessage['ERROR'],
      });
    }

    return createNoPointsTemplate({
      massage: EmptyListMessage[this.#filterType.toUpperCase()],
    });
  }
}
