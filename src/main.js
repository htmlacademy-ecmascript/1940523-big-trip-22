import MainPresenter from './presenter/main-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MockService from './service/mock-service.js';
import DestinationModel from './model/destination-model.js';
import EventPointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';

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
const mainPresenter = new MainPresenter({
  tripContainer: siteTripEventsElements,
  destinationModel,
  eventPointsModel,
  offersModel
});

headerPresenter.init();
mainPresenter.init();
