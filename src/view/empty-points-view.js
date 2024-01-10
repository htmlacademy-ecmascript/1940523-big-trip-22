import AbstractView from '../framework/view/abstract-view.js';

function createNoPointsTemplate(massage) {
  return (
    `<p class="trip-events__msg">
      ${ massage }
    </p>`
  );
}

export default class NoPointView extends AbstractView {
  #massage = null;

  constructor({massage}) {
    super();
    this.#massage = massage;
  }

  get template() {
    return createNoPointsTemplate(this.#massage);
  }
}
