import RadioListView from './radio-list-view.js';

function createSortTypeTemplate (sorting) {
  return sorting.reduce(
    (markup, { type, isDisabled, isChecked }) => `${markup}
    <div class="trip-sort__item  trip-sort__item--${type}">
          <input id="sort-${type}"
          class="trip-sort__input  visually-hidden"
          type="radio"
          name="trip-sort"
          value="sort-${type}"
          ${isDisabled ? 'disabled' : ''}
          ${isChecked ? 'checked' : ''}>
          <label class="trip-sort__btn" for="sort-${type}">${type}</label>
        </div>`, ''
  );
}

const createListSortTemplate = (sorting) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortTypeTemplate(sorting)}
  </form>`;


export default class ListSortView extends RadioListView {
  get template() {
    return createListSortTemplate(this._items);
  }
}
