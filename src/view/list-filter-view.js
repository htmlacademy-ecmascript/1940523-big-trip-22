import RadioListView from './radio-list-view.js';
import {capitalizeFirstLetter} from '../utils/common.js';

function createElementFilterTemplate(filters) {
  return filters.reduce(
    (markup, { type, isChecked, isDisabled }) => `${markup}
    <div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden"
            type="radio"
            name="trip-filter"
            value="${type}"
            data-item="${type}"
            ${isChecked ? 'checked' : ''}
            ${isDisabled ? 'disabled' : ''}>
            <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
          </div>`,
    ''
  );
}

const createListFilterTemplate = (
  filters
) => `<form class="trip-filters" action="#" method="get">
        ${createElementFilterTemplate(filters)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`;


export default class ListFilterView extends RadioListView {

  get template() {
    return createListFilterTemplate(this._items);
  }
}
