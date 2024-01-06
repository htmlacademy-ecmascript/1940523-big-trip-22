import dayjs from 'dayjs';
import { Duration } from '../constants.js';
import {getRandomNumberFromRange} from '../utils.js';

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
