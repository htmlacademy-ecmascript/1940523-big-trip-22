import { UpdateType } from '../constants.js';
import { render, replace, remove } from '../framework/render.js';
import { filter } from '../utils/filter.js';
import ListFilterView from '../view/list-filter-view.js';

export default class FilterPresenter {
  #eventPointsModel = [];
  #filtersModel = null;
  #headerContainer = null;
  #filters = [];
  #filterComponent = null;

  constructor({ headerContainer, eventPointsModel, filtersModel}) {
    this.#eventPointsModel = eventPointsModel;
    this.#headerContainer = headerContainer;
    this.#filtersModel = filtersModel;
    this.#eventPointsModel.addObserver(this.#handleModeChange);
    this.#filtersModel.addObserver(this.#handleModeChange);

    this.#filters = Object.entries(filter).map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        isDisabled: !filterPoints(this.#eventPointsModel.get()).length
      })
    );
  }

  init() {
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new ListFilterView({
      items: this.#filters.map((filterItem) => ({...filterItem, isChecked: this.#filtersModel.get() === filterItem.type})),
      onItemChange: this.#filterTypeChangeHandler,
    });

    if (prevFilterComponent) {
      replace(this.#filterComponent, prevFilterComponent);
      remove(prevFilterComponent);
    } else {
      render(this.#filterComponent, this.#headerContainer);
    }
  }

  #filterTypeChangeHandler = (filterType) => {
    this.#filtersModel.set(UpdateType.MAJOR, filterType);
  };

  #handleModeChange = () => {
    this.init();
  };
}
