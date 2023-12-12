import {render, RenderPosition} from '../render';
import HeaderInfoView from '../view/header-info-view';
import ListFilterView from '../view/list-filter-view';

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
