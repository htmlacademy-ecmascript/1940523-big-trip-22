import dayjs from 'dayjs';
import { Duration } from '../constants.js';
import { getRandomNumber } from '../utils.js';

let randomDate = dayjs().subtract(getRandomNumber(0, Duration.DAY), 'day').toDate();

export const getDate = ({
  next
}) => {
  const daysInterval = getRandomNumber(0, Duration.DAY);
  const hoursInterval = getRandomNumber(1, Duration.HOUR);
  const minsInterval = getRandomNumber(0, Duration.MINUTE);

  if (next) {
    randomDate = dayjs(randomDate)
      .add(minsInterval, 'minute')
      .add(hoursInterval, 'hour')
      .add(daysInterval, 'day')
      .toDate();
  }

  return randomDate;
};
