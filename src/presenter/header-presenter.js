import { render, RenderPosition } from '../framework/render.js';
import HeaderInfoView from '../view/header-info-view.js';
import ListFilterView from '../view/list-filter-view.js';
import { generateFilter } from '../mock/filter.js';

export default class HeaderPresenter {
  #eventPointsModel = null;
  #tripHeaderInfo = null;
  #tripHeaderFilter = null;
  #eventPoints = null;

  constructor({ tripHeaderInfo, tripHeaderFilter, eventPointsModel }) {
    this.#tripHeaderInfo = tripHeaderInfo;
    this.#eventPointsModel = eventPointsModel;
    this.#eventPoints = this.#eventPointsModel.get();
    this.#tripHeaderFilter = tripHeaderFilter;
  }

  init() {
    const filters = generateFilter(this.#eventPoints);
    render(new HeaderInfoView(), this.#tripHeaderInfo, RenderPosition.AFTERBEGIN);
    render(new ListFilterView({filters}), this.#tripHeaderFilter);
  }
}
