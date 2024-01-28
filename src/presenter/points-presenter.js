import {remove, render} from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import {FilterType, SortTypes, UpdateType, UserAction} from '../constants.js';
import NoPointView from '../view/empty-points-view.js';
import PointPresenter from './point-presener.js';
import SortPresenter from './sort-presener.js';
import {sorting} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import AddPointPresenter from './add-point-presenter.js';

export default class PointsPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #offersModel = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortTypes.DAY;
  #tripListComponent = new TripListView();
  #pointsPresenter = new Map();
  #addPointPresenter = null;
  #addPointButtonPresenter = null;
  #sortPresenter = null;
  #emptyListComponent = null;
  #isCreating = false;

  constructor({ tripContainer, destinationModel, eventPointsModel, offersModel, filtersModel, addPointButtonPresenter }) {
    this.#tripContainer = tripContainer;
    this.#destinationModel = destinationModel;
    this.#eventPointsModel = eventPointsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filtersModel;
    this.#addPointButtonPresenter = addPointButtonPresenter;

    this.#addPointPresenter = new AddPointPresenter({
      container: this.#tripListComponent.element,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#addPointDestroyHandler,
    });
    this.#eventPointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    const filterType = this.#filterModel.get();
    const filteredPoints = filter[filterType](this.#eventPointsModel.get());

    return sorting[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#renderBoard();
  }

  addPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#addPointButtonPresenter.disabledButton();
    this.#addPointPresenter.init();
  };

  #addPointDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#addPointButtonPresenter.enabledButton();
    if (!this.points.length && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  }

  #renderBoard() {
    if (!this.points.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderTripList();
    this.#renderEventPoints();
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#clearPoints();
    this.#sortPresenter.destroy();
    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenter.get(data?.id)?.init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
    }
  };

  #renderSort() {
    this.#sortPresenter = new SortPresenter({
      container: this.#tripContainer,
      currentSortType: this.#currentSortType,
      sortTypeHandler: this.#sortTypesChangeHandler,
    });
    this.#sortPresenter.init();
  }

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #renderTripList() {
    render(this.#tripListComponent, this.#tripContainer);
  }

  #sortTypesChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderEventPoints();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPointsModel.update(updateType, update);
        break;
      case UserAction.CREATE_POINT:
        this.#eventPointsModel.add(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#eventPointsModel.delete(updateType, update);
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderEmptyList() {
    this.#emptyListComponent = new NoPointView({
      filterType: this.#filterModel.get()
    });
    render(this.#emptyListComponent, this.#tripContainer);
  }

  #renderEventPoints() {
    this.points.forEach((eventPoint) => {
      this.#renderEventPoint(eventPoint);
    });
  }

  #renderEventPoint(eventPoint) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListComponent.element,
      destinationModel: this.#destinationModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(eventPoint);
    this.#pointsPresenter.set(eventPoint.id, pointPresenter);
  }
}
