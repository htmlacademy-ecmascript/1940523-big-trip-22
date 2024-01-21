import { render } from '../framework/render.js';
import {enabledSortType, SortTypes} from '../constants.js';
import ListSortView from '../view/list-sort-view.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #currentSortType = SortTypes.DAY;
  #sortTypesChangeHandler = null;

  constructor({ container, sortTypeHandler}) {
    this.#container = container;
    this.#sortTypes = Object.values(SortTypes).map((type) => ({
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !enabledSortType[type],
    }));
    this.#sortTypesChangeHandler = sortTypeHandler;
  }

  init() {
    render(
      new ListSortView({
        items: this.#sortTypes,
        onItemChange: this.#sortTypesChangeHandler,
      }),
      this.#container
    );
  }
}
