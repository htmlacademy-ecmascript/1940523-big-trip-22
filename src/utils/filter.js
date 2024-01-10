import { FILTER_TYPE } from '../constants.js';
import { isPointFuture,isPointPresent, isPointPast } from './point.js';

export const filter = {
  [FILTER_TYPE.EVERYTHING]: (eventPoints) => eventPoints.filter((eventPoint) => eventPoint),
  [FILTER_TYPE.FUTURE]: (eventPoints) => eventPoints.filter((eventPoint) => isPointFuture (eventPoint.dateFrom)),
  [FILTER_TYPE.PRESENT]: (eventPoints) => eventPoints.filter((eventPoint) => isPointPresent (eventPoint.dateFrom, eventPoint.dateTo)),
  [FILTER_TYPE.PAST]: (eventPoints) => eventPoints.filter((eventPoint) => isPointPast (eventPoint.dateTo))
};
