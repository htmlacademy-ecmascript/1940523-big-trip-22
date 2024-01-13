import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {getRandomNumberFromRange} from './common.js';
import {
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  SEC_IN_MINUTES,
  HOURS_IN_DAY,
  MINUTES_FORMAT,
  FULL_DATE_FORMAT,
  HOURS_FORMAT,
  Duration
} from '../constants.js';

dayjs.extend(minMax);

let randomDate = dayjs().subtract(getRandomNumberFromRange(1, Duration.DAY), 'day').toDate();

export const getDate = ({
  next
}) => {
  const daysInterval = getRandomNumberFromRange(1, Duration.DAY);
  const hoursInterval = getRandomNumberFromRange(1, Duration.HOUR);
  const minsInterval = getRandomNumberFromRange(0, Duration.MINUTE);

  if (next) {
    randomDate = dayjs(randomDate)
      .add(minsInterval, 'minute')
      .add(hoursInterval, 'hour')
      .add(daysInterval, 'day')
      .toDate();
  }

  return randomDate;
};


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


export function isPointFuture(dateFrom) {

  return dayjs().isBefore(dateFrom, 'day');
}

export function isPointPresent(dateFrom, dateTo) {

  return !isPointFuture(dateFrom) && !isPointPast(dateTo);
}

export function isPointPast(dateTo) {

  return dayjs().isAfter(dateTo, 'day');
}
