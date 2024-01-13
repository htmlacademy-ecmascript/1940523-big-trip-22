import { render } from '../framework/render.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import { NO_POINT_MASSAGES } from '../constants.js';
import NoPointView from '../view/empty-points-view.js';
import PointPresenter from './point-presener.js';
import { updateItem } from '../utils/common.js';

export default class TripPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #offersModel = null;
  #tripListComponent = new TripListView();
  #eventPoints = [];
  #pointsPresenter = new Map();

  constructor({ tripContainer, destinationModel, eventPointsModel, offersModel }) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.get()];

    if (!this.#eventPoints.length) {
      this.#renderNoPoints();
    }

    this.#renderSort();
    this.#renderTripList();
  }

  #renderSort() {
    render(new ListSortView(), this.#tripContainer);
  }

  #renderTripList() {
    render(this.#tripListComponent, this.#tripContainer);
    this.#renderEventPoints();
  }

  #handleDataChange = (updatedPoint) => {
    this.#eventPoints = updateItem(this.#eventPoints, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderNoPoints() {
    const massage = NO_POINT_MASSAGES.everthing;
    render(new NoPointView({massage}), this.#tripContainer);
  }

  #renderEventPoints() {
    this.#eventPoints.forEach((eventPoint) => {
      this.#renderEventPoint(eventPoint);
    });
  }

  #renderEventPoint(eventPoint) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListComponent.element,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(eventPoint);
    this.#pointsPresenter.set(eventPoint.id, pointPresenter);;
  }
}
