import { FilterType } from '../constants.js';
import { isPointFuture,isPointPresent, isPointPast } from './point.js';

export const filter = {
  [FilterType.EVERYTHING]: (eventPoints) => eventPoints.filter((eventPoint) => eventPoint),
  [FilterType.FUTURE]: (eventPoints) => eventPoints.filter((eventPoint) => isPointFuture (eventPoint.dateFrom)),
  [FilterType.PRESENT]: (eventPoints) => eventPoints.filter((eventPoint) => isPointPresent (eventPoint.dateFrom, eventPoint.dateTo)),
  [FilterType.PAST]: (eventPoints) => eventPoints.filter((eventPoint) => isPointPast (eventPoint.dateTo))
};
