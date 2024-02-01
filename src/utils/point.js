import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import duration from 'dayjs/plugin/duration';
import {DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT} from '../constants.js';

dayjs.extend(minMax);
dayjs.extend(duration);

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

export const calcDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  const eventDuration = dayjs.duration(diff);

  if (eventDuration.days()) {
    return eventDuration.format('DD[D] HH[H] mm[m]');
  }

  if (eventDuration.hours()) {
    return eventDuration.format('HH[H] mm[m]');
  }

  return eventDuration.format('mm[m]');
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
