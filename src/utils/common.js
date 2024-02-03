import {calcDuration, isDatesEqual} from './point.js';
import {sorting} from './sort.js';
import {DESTINATION_ITEMS_COUNT, SortTypes} from '../constants.js';
import dayjs from 'dayjs';

export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isMinorChange = (pointA, pointB) =>
  isDatesEqual(pointA, pointB)
  || pointA.basePrice !== pointB.basePrice
  || calcDuration(pointA.dateFrom, pointA.dateTo) !== calcDuration(pointB.dateFrom, pointB.dateTo);

export const adaptToClient = (point) => {
  const adaptedPoint = {
    ...point,
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    basePrice: point['base_price'],
    isFavorite: point['is_favorite'],
  };

  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['base_price'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
};

export const adaptToServer = (point) => {
  const adaptedPoint = {
    ...point,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['base_price']: parseInt(point.basePrice, 10),
    ['is_favorite']: point.isFavorite,
  };

  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.basePrice;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
};

export const getFullTrip = (points = [], destinations = []) => {
  const destinationsNames = sorting[SortTypes.DAY]([...points]).map((point) =>
    destinations.find((destination) => destination.id === point.destination).name
  );

  return destinationsNames.length <= DESTINATION_ITEMS_COUNT
    ? destinationsNames.join(' &mdash; ')
    : `${destinationsNames.at(0)} &mdash; ... &mdash; ${destinationsNames.at(-1)}`;
};

export const getTripPeriod = (points = []) => {
  const sortedPoints = sorting[SortTypes.DAY]([...points]);

  return sortedPoints.length
    ? `${dayjs(sortedPoints.at(0).dateFrom).format('DD MMM')} - ${dayjs(sortedPoints.at(-1).dateTo).format('DD MMM')}`
    : '';
};

const getCheckedOffers = (offers, type) => offers.find((offer) => offer.type === type)?.offers;

const getOffersCost = (offerIDs = [], offers = []) => (
  offerIDs.reduce(
    (offerCost, id) => offerCost + (offers.find((offer) => offer.id === id)?.price ?? 0),
    0,
  )
);

export const getTripFullCost = (points = [], offers = []) => (
  points.reduce(
    (total, point) => total + point.basePrice + getOffersCost(point.offers, getCheckedOffers(offers, point.type)),
    0,
  )
);
