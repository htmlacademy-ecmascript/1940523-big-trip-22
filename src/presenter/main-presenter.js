import {render} from '../render';
import AddPointView from '../view/add-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripPointView from '../view/trip-point-view.js';

export default class MainPresenter {
  sortComponent = new ListSortView();
  tripListComponent = new TripListView();

  constructor({ tripContainer, destinationModel, eventPointsModel, offersModel }) {
    this.tripContainer = tripContainer;
    this.destinationModel = destinationModel;
    this.eventPointsModel = eventPointsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.eventPoints = this.eventPointsModel.get();
    this.destinations = this.destinationModel.get();
    this.offers = this.offersModel.get();

    render(this.sortComponent, this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(new EditPointView({
      destinations: this.destinations,
      offers: this.offers
    }), this.tripListComponent.getElement());

    for (let i = 0; i < this.eventPoints.length; i++) {
      const destination = this.destinationModel.getById(i + 1);
      render(
        new TripPointView({
          destination,
          eventPoints: this.eventPoints[i],
          offers: this.offers
        }),
        this.tripListComponent.getElement()
      );
    }

    render(
      new AddPointView(),
      this.tripListComponent.getElement()
    );
  }
}
