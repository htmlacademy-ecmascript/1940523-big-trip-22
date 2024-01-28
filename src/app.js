import MockService from './service/mock-service.js';
import DestinationModel from './model/destination-model.js';
import EventPointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model';
import PointsPresenter from './presenter/points-presenter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import AddPointButtonPresenter from './presenter/add-point-button-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElements = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const mockService = new MockService();
const destinationModel = new DestinationModel(mockService);
const eventPointsModel = new EventPointsModel(mockService);
const offersModel = new OffersModel(mockService);
const filtersModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: siteTripMainElement,
  tripHeaderFilter: siteFiltersElement,
  eventPointsModel
});

const filterPresenter = new FilterPresenter({
  headerContainer: siteFiltersElement,
  eventPointsModel,
  filtersModel
});

const addPointButtonPresenter = new AddPointButtonPresenter({
  headerContainer: siteTripMainElement,
});

const pointsPresenter = new PointsPresenter({
  tripContainer: siteTripEventsElements,
  destinationModel,
  eventPointsModel,
  offersModel,
  filtersModel,
  addPointButtonPresenter: addPointButtonPresenter,
});

export default class BigTripApp {
  init() {
    tripInfoPresenter.init();
    filterPresenter.init();
    addPointButtonPresenter.init({onButtonClick: pointsPresenter.addPointButtonClickHandler});
    pointsPresenter.init();
  }
}
