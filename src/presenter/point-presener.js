import TripPointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {remove, render, replace} from '../framework/render.js';
import { MODE } from '../constants.js';

export default class PointPresenter {
  #point = null;
  #eventPointComponent = null;
  #eventEditPointComponent = null;
  #destinationModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #pointListContainer = null;
  #mode = MODE.DEFAULT;
  #handleModeChange = null;

  constructor({pointListContainer, destinationModel, offersModel, onPointChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onPointChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const preventEventPointComponent = this.#eventPointComponent;
    const preventEventEditPointComponent = this.#eventEditPointComponent;

    this.#eventPointComponent = new TripPointView({
      destination: this.#destinationModel.getById(point.destination),
      eventPoint: this.#point,
      offers: this.#offersModel.getByType(point.type),
      onEditClick: this.#editPointHandler,
      onFavoriteClick: this.#onFavoriteClick
    });

    this.#eventEditPointComponent = new EditPointView({
      eventPoint: this.#point,
      destinations: this.#destinationModel.get(),
      pointOffers: this.#offersModel.get(),
      onCloseClick: this.#editPointCloseHandler,
      onSaveEdit: this.#editPointSubmitHandler,
    });

    if (!preventEventPointComponent || !preventEventEditPointComponent) {
      render(this.#eventPointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#eventPointComponent, preventEventPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#eventEditPointComponent, preventEventEditPointComponent);
    }

    remove(preventEventPointComponent);
    remove(preventEventEditPointComponent);
  }

  destroy() {
    remove(this.#eventPointComponent);
    remove(this.#eventEditPointComponent);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#eventEditPointComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown',this.#escKeyDownHandler);
    }
  };

  #replaceEditFormToPoint = () => {
    this.#eventEditPointComponent.reset(this.#point);
    replace(this.#eventPointComponent, this.#eventEditPointComponent);
    this.#mode = MODE.DEFAULT;
  };

  #replacePointToEditForm = () => {
    replace(this.#eventEditPointComponent, this.#eventPointComponent);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  };

  #editPointHandler = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #editPointCloseHandler = () => {
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #editPointSubmitHandler = (point) => {
    this.#replaceEditFormToPoint();
    this.#handleDataChange(point);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
