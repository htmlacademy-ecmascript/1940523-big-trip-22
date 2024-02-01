import {calcDuration, isDatesEqual} from './point.js';

export function incrementCounter(startFrom) {
  let counterStart = startFrom;
  return function () {
    return counterStart++;
  };
}

//получение рандомного элемента из массива
export function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

//получение рандомного числа
export function getRandomNumber(maxNumber) {
  return Math.ceil(Math.random() * maxNumber);
}

//получение рандомного числа из диапазона
export function getRandomNumberFromRange (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//получение рандомного булева значения
export function getRandomBool() {
  return Math.random() >= 0.5;
}

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
