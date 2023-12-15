import {render} from '../render';
import AddPointView from '../view/add-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';

const MAX_POINTS_COUNT = 3;

export default class MainPresenter {
  sortComponent = new ListSortView();
  tripListComponent = new TripListView();

  constructor({ tripContainer, destinationModel }) {
    this.tripContainer = tripContainer;
    this.destinationModel = destinationModel;
    console.log(this.destinationModel);
  }

  init() {
    render(this.sortComponent, this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(new EditPointView(), this.tripListComponent.getElement());

    for (let i = 0; i < MAX_POINTS_COUNT; i++) {
      render(new TripPointView(), this.tripListComponent.getElement());
    }

    render(new AddPointView(), this.tripListComponent.getElement());
  }
}
