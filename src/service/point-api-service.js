import ApiService from '../framework/api-service.js';
import {Method, SourceUrl} from '../constants.js';

export default class PointApiService extends ApiService {
  get points() {
    return this._load({ url: SourceUrl.POINTS}).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: SourceUrl.DESTINATIONS}).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: SourceUrl.OFFERS}).then(ApiService.parseResponse);
  }

  async UpdatePoint(point){
    const response = await this._load({
      url: `${SourceUrl.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async AddPoint(point){
    const response = await this._load({
      url: SourceUrl.POINTS,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point){
    await this._load({
      url: `${SourceUrl.POINTS}/${point.id}`,
      method: Method.DELETE,
    });
  }
}
