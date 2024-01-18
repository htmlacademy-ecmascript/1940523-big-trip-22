import {SortTypes} from '../constants.js';
import dayjs from 'dayjs';

const getPointsByDate = (pointA, pointB) =>
  dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));

const getPointsByTime = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return pointBDuration - pointADuration;
};

const getPointByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sorting = {
  [SortTypes.DAY]: (eventPoints) => eventPoints.toSorted(getPointsByDate),
  [SortTypes.EVENT]: () => {
    throw new Error(`Sort by ${SortTypes.EVENT} is disabled`);
  },
  [SortTypes.TIME]: (eventPoints) => eventPoints.toSorted(getPointsByTime),
  [SortTypes.PRICE]: (eventPoints) => eventPoints.toSorted(getPointByPrice()),
  [SortTypes.OFFER]: () => {
    throw new Error(`Sort by ${SortTypes.OFFER} is disabled`);
  },
};
