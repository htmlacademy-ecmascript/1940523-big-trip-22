import MainPresenter from './presenter/main-presenter';
import HeaderPresenter from './presenter/header-presenter';
import './mock/destination.js';
import DestinationModel from './model/offers-model';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElements = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const destinationModel = new DestinationModel;
const headerPresenter = new HeaderPresenter({
  tripHeaderInfo: siteTripMainElement,
  tripHeaderFilter: siteFiltersElement
});
const mainPresenter = new MainPresenter({
  tripContainer: siteTripEventsElements,
  destinationModel
});

headerPresenter.init();
mainPresenter.init();
