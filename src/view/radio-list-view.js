import AbstractView from '../framework/view/abstract-view.js';

export default class RadioListView extends AbstractView {
  _items = [];
  _handleItemChange = null;

  constructor({ items, onItemChange }) {
    super();
    this._items = items;
    this._handleItemChange = onItemChange;

    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  #itemChangeHandler = (evt) => {
    evt.preventDefault();
    this._handleItemChange?.(evt.target.dataset.item);
    console.log(this._items)
    console.log(this._handleItemChange)
    console.log(evt.target.dataset.item)
  };
  // get template() {
  //   return createListSortTemplate(this._items);
  // }
}
