import {remove, render, RenderPosition, replace} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #eventPointsModel = null;
  #tripInfoComponent = null;
  #tripInfoContainer = null;
  #eventPoints = null;

  constructor({ tripInfoContainer, eventPointsModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#eventPoints = this.#eventPointsModel.get();
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView();
    if (!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);

    render(this.#tripInfoComponent, this.#tripInfoContainer);
  }
}
