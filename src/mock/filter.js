import { filter } from '../utils/filter.js';

export function generateFilter(eventPoints) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(eventPoints).length,
      points: filterPoints(eventPoints),
    }),
  );
}
