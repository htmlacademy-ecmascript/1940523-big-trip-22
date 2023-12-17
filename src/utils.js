import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  SEC_IN_MINUTES,
  HOURS_IN_DAY,
  MINUTES_FORMAT,
  FULL_DATE_FORMAT, HOURS_FORMAT
} from './constants.js';

dayjs.extend(minMax);

export function humanizeEventDate (eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_FORMAT) : '';
}

export function humanizeEventTime (eventDateTime) {
  return eventDateTime ? dayjs(eventDateTime).format(TIME_FORMAT) : '';
}

export function humanizeEventDateTime (eventDateTime) {
  return eventDateTime ? dayjs(eventDateTime).format(DATE_TIME_FORMAT) : '';
}

export function getDifferenceInTime(start, dateTo) {
  const difference = dayjs(dateTo).diff(start) / SEC_IN_MINUTES;

  if (difference < SEC_IN_MINUTES) {
    return dayjs(difference).format(MINUTES_FORMAT);
  } else if (difference > SEC_IN_MINUTES && difference < SEC_IN_MINUTES * HOURS_IN_DAY) {
    return dayjs(difference).format(HOURS_FORMAT);
  } else {
    return dayjs(difference).format(FULL_DATE_FORMAT);
  }
}
//функция инкремента
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

//получение рандомного булева значения
export function getRandomBool() {
  return Math.random() >= 0.5;
}

export function getElementByKey(object, key) {
  return object[key] || null;
}
