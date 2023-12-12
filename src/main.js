import MainPresenter from './presenter/main-presenter';
import HeaderPresenter from './presenter/header-presenter';

const siteTripMainElement = document.querySelector('.trip-main');
const siteTripEventsElements = document.querySelector('.trip-events');
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const headerPresenter = new HeaderPresenter({tripHeaderInfo: siteTripMainElement, tripHeaderFilter: siteFiltersElement});
const mainPresenter = new MainPresenter({tripContainer: siteTripEventsElements});

headerPresenter.init();
mainPresenter.init();
