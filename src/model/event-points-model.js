import { getEventPoint } from '../mock/event-points.js';

export default class EventPointsModel {
  #eventPoints = [];
  constructor() {
    this.#eventPoints = getEventPoint();
  }

  get() {
    return this.#eventPoints;
  }
}
