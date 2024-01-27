export const MAX_IMAGES_COUNT = 5;
export const MAX_PRICE_VALUE = 1500;
export const MAX_PRICE_OFFER = 69;
export const DATE_FORMAT = 'MMM D';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = 'DD/MM/YY HH:mm';

export const TIME = {
  MIN_MINUTES: 1,
  MAX_MINUTES: 2440,
  HOURS_PER_DAY: 24,
  MINUTES_PER_HOUR: 60
};

export const OFFERS_COUNT = {
  MIN: 1,
  MAX: 5
};

export const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
];

export const Price = {
  MIN: 1,
  MAX: 666
};

export const Duration = {
  HOUR: 6,
  DAY: 15,
  MINUTE: 24
};

export const CITIES = [
  'Istanbul',
  'London',
  'Berlin',
  'Madrid',
  'Rome',
  'Paris',
  'Barcelona',
  'Prague',
  'Moscow',
];

export const OFFERS_TITLES = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train'
];

export const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export const enabledSortType = {
  [SortTypes.DAY]: true,
  [SortTypes.EVENT]: false,
  [SortTypes.TIME]: true,
  [SortTypes.PRICE]: true,
  [SortTypes.OFFER]: false,
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const NO_POINT_MASSAGES = {
  loadFail: 'Failed to load latest route information',
  loading: 'Loading...',
  everthing: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now'
};

export const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
