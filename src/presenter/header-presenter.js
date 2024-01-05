import { render, RenderPosition } from '../framework/render.js';
import HeaderInfoView from '../view/header-info-view.js';
import ListFilterView from '../view/list-filter-view.js';

export default class HeaderPresenter {
  constructor({ tripHeaderInfo, tripHeaderFilter }) {
    this.tripHeaderInfo = tripHeaderInfo;
    this.tripHeaderFilter = tripHeaderFilter;
  }

  init() {
    render(new HeaderInfoView(), this.tripHeaderInfo, RenderPosition.AFTERBEGIN);
    render(new ListFilterView(), this.tripHeaderFilter);
  }
}
