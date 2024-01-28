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

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsTemplate({
      massage: EmptyListMessage[this.#filterType.toUpperCase()],
    });
  }
}
