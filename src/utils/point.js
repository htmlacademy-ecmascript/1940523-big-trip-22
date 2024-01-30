import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import {getRandomNumberFromRange} from './common.js';
import {DATE_FORMAT, DATE_TIME_FORMAT, Duration, TIME, TIME_FORMAT} from '../constants.js';

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

export function isDatesEqual (dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export const getDifferenceInTime = (dateFrom, dateTo) => {
  const durationInMinutes = dayjs(dateTo).diff(dateFrom, 'm');

  const days = Math.floor(durationInMinutes / (TIME.HOURS_PER_DAY * TIME.MINUTES_PER_HOUR));
  const hours = Math.floor((durationInMinutes % (TIME.HOURS_PER_DAY * TIME.MINUTES_PER_HOUR)) / TIME.MINUTES_PER_HOUR);
  const minutes = durationInMinutes % TIME.MINUTES_PER_HOUR;

  let durationString = '';

  if (days > 0) {
    durationString += `${days}D `;
  }

  if (hours > 0) {
    durationString += `${hours}H `;
  }

  if (minutes > 0) {
    durationString += `${minutes}M `;
  }

  return durationString;
};

export function isPointFuture(dateFrom) {

  return dayjs().isBefore(dateFrom, 'day');
}

export function isPointPresent(dateFrom, dateTo) {

  return !isPointFuture(dateFrom) && !isPointPast(dateTo);
}

export function isPointPast(dateTo) {

  return dayjs().isAfter(dateTo, 'day');
}
