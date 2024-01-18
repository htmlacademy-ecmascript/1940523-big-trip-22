import { render } from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import {NO_POINT_MASSAGES, SortTypes} from '../constants.js';
import NoPointView from '../view/empty-points-view.js';
import PointPresenter from './point-presener.js';
import { updateItem } from '../utils/common.js';
import SortPresenter from './sort-presener.js';
import {getPointByPrice, getPointsByDate, getPointsByTime, sorting} from '../utils/sort.js';

export default class PointsPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #offersModel = null;
  #currentSortType = null;
  #defaultSortType = SortTypes.DAY;
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
    //render(new ListSortView(), this.#tripContainer);
    const sortPresenter = new SortPresenter({
      container: this.#tripContainer,
      sortTypeHandler: this.#sortTypesChangeHandler,
    });
    sortPresenter.init();
  }

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#eventPoints = sorting[this.#currentSortType](this.#eventPoints);
  };

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #renderTripList() {
    render(this.#tripListComponent, this.#tripContainer);
    //this.#renderEventPoints();
    this.#sortTypesChangeHandler(this.#defaultSortType);
  }

  #sortTypesChangeHandler = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderEventPoints();
  };

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
    this.#pointsPresenter.set(eventPoint.id, pointPresenter);
  }
}
