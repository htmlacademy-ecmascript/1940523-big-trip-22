import {remove, render, RenderPosition, replace} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #eventPointsModel = null;
  #tripInfoComponent = null;
  #tripInfoContainer = null;
  #destinationModel = null;
  #offersModel = null;

  constructor({ tripInfoContainer, eventPointsModel, destinationModel, offersModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventPointsModel = eventPointsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;

    this.#eventPointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView({
      destinations: this.#destinationModel.get(),
      points: this.#eventPointsModel.get(),
      offers: this.#offersModel.get(),
    });

    if (!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);

    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #modelEventHandler = () => {
    this.init();
  };
}
