import {remove, render} from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import {FilterType, SortTypes, TimeLimit, UpdateType, UserAction} from '../constants.js';
import NoPointView from '../view/empty-points-view.js';
import PointPresenter from './point-presener.js';
import SortPresenter from './sort-presener.js';
import {sorting} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import AddPointPresenter from './add-point-presenter.js';
import LoaderView from '../view/loader-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class PointsPresenter {
  #tripContainer = null;
  #destinationModel = null;
  #eventPointsModel = null;
  #offersModel = null;
  #filterModel = null;
  #currentSortType = SortTypes.DAY;
  #tripListComponent = new TripListView();
  #pointsPresenter = new Map();
  #addPointPresenter = null;
  #addPointButtonPresenter = null;
  #sortPresenter = null;
  #emptyListComponent = null;
  #loaderComponent = new LoaderView();
  #uiBlocker = new UiBlocker({lowerLimit: TimeLimit.LOWER_LIMIT, upperLimit: TimeLimit.UPPER_LIMIT});
  #isLoading = true;
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
      onDataChange: this.#viewActionChangeHandler,
      onDestroy: this.#addPointDestroyHandler,
    });
    this.#eventPointsModel.addObserver(this.#modelEventChangeHandler);
    this.#filterModel.addObserver(this.#modelEventChangeHandler);
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
    this.#filterModel.set(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#currentSortType = SortTypes.DAY;
    this.#addPointPresenter.init();
  };

  #addPointDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#addPointButtonPresenter.enabledButton();
    if (!this.points.length && isCanceled) {
      this.#clearBoard();
      this.#renderBoard();
    }
  };

  #renderBoard() {
    if (this.#isLoading) {
      this.#addPointButtonPresenter.disabledButton();
      this.#renderLoading();
      return;
    }
    if (!this.points.length && !this.#isCreating) {
      this.#renderEmptyList();
      this.#addPointButtonPresenter.enabledButton();
      return;
    }

    if (!this.#isCreating) {
      this.#addPointButtonPresenter.enabledButton();
    }

    this.#renderSort();
    this.#renderTripList();
    this.#renderEventPoints();
  }

  #renderLoading() {
    render(this.#loaderComponent, this.#tripContainer);
  }

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#clearPoints();
    if (this.#sortPresenter) {
      this.#sortPresenter.destroy();
    }
    remove(this.#emptyListComponent);
    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #modelEventChangeHandler = (updateType, data) => {
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

      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loaderComponent);
        this.#renderBoard();
        break;

      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loaderComponent);
        this.#renderErrorMessage();
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
    this.#addPointPresenter.destroy();
  };

  #renderTripList() {
    render(this.#tripListComponent, this.#tripContainer);
  }

  #sortTypesChangeHandler = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderEventPoints();
  };

  #viewActionChangeHandler = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenter.get(update.id).setSaving();
        try {
          await this.#eventPointsModel.update(updateType, update);
        } catch (error) {
          this.#pointsPresenter.get(update.id).setAborting();
        }
        break;

      case UserAction.CREATE_POINT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#eventPointsModel.add(updateType, update);

          this.#addPointPresenter.destroy({isCanceled: false});
        } catch (error) {
          this.#addPointPresenter.setAborting();
        }
        break;

      case UserAction.DELETE_POINT:
        this.#pointsPresenter.get(update.id).setRemove();
        try {
          await this.#eventPointsModel.delete(updateType, update);
        } catch (error) {
          this.#pointsPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
    this.#addPointPresenter.destroy();
  };

  #renderEmptyList() {
    this.#emptyListComponent = new NoPointView({
      filterType: this.#filterModel.get(),
    });
    render(this.#emptyListComponent, this.#tripContainer);
  }

  #renderErrorMessage() {
    this.#emptyListComponent = new NoPointView({
      filterType: this.#filterModel.get(),
      isServerError: true,
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
      onPointChange: this.#viewActionChangeHandler,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(eventPoint);
    this.#pointsPresenter.set(eventPoint.id, pointPresenter);
  }
}
