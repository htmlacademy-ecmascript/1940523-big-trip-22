import HeaderPresenter from './header-presenter.js';
import MockService from '../service/mock-service.js';
import DestinationModel from '../model/destination-model.js';
import EventPointsModel from '../model/event-points-model.js';
import OffersModel from '../model/offers-model';
import TripPresenter from './trip-presenter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElements = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const eventPointsModel = new EventPointsModel(mockService);
const offersModel = new OffersModel(mockService);

const headerPresenter = new HeaderPresenter({
  tripHeaderInfo: siteTripMainElement,
  tripHeaderFilter: siteFiltersElement,
  eventPointsModel
});
const tripPresenter = new TripPresenter({
  tripContainer: siteTripEventsElements,
  destinationModel,
  eventPointsModel,
  offersModel
});

export default class MainPresenter {
  init() {
    headerPresenter.init();
    tripPresenter.init();
  }
}
