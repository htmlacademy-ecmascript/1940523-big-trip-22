import TripPointView from '../view/trip-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {remove, render, replace} from '../framework/render.js';
import {EditType, MODE, UpdateType, UserAction} from '../constants.js';
import {isMinorChange} from '../utils/common.js';

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
      onEditClick: this.#editPointClickHandler,
      onFavoriteClick: this.#onFavoriteClickHandler
    });

    this.#eventEditPointComponent = new EditPointView({
      eventPoint: this.#point,
      destinations: this.#destinationModel.get(),
      pointOffers: this.#offersModel.get(),
      onCloseClick: this.#editPointCloseClickHandler,
      onSaveEdit: this.#editPointSubmitHandler,
      onDeleteClick: this.#deleteClickHandler,
      editorMode: EditType.EDITING,
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
      this.replaceEditFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.replaceEditFormToPoint();
      document.removeEventListener('keydown',this.#escKeyDownHandler);
    }
  };

  #deleteClickHandler = (point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };

  replaceEditFormToPoint = () => {
    this.#eventEditPointComponent.reset(this.#point);
    replace(this.#eventPointComponent, this.#eventEditPointComponent);
    this.#mode = MODE.DEFAULT;
  };

  #replacePointToEditForm = () => {
    replace(this.#eventEditPointComponent, this.#eventPointComponent);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  };

  #editPointClickHandler = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #editPointCloseClickHandler = () => {
    this.replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #editPointSubmitHandler = (point) => {
    const currentTypeChange = isMinorChange(point, this.#point) ? UpdateType.MINOR : UpdateType.PATCH;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      currentTypeChange,
      point,
    );
  };

  #onFavoriteClickHandler = () => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.PATCH, {
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };

  setSaving = () => {
    if (this.#mode === MODE.EDITING) {
      this.#eventEditPointComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  };

  setAborting = () => {
    if (this.#mode === MODE.DEFAULT) {
      this.#eventEditPointComponent.shake();
      this.#eventPointComponent.shake();
      return;
    }

    if (this.#mode === MODE.EDITING) {
      const resetFormState = () => {
        this.#eventEditPointComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      };

      this.#eventEditPointComponent.shake(resetFormState);
    }
  };

  setRemove = () => {
    if (this.#mode === MODE.EDITING) {
      this.#eventEditPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };
}
