import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { Ship } from '../objects/Ship';
import { RequestService } from './request/request.service';
import { BaseSettings } from '../config/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ShipsService extends BaseService<Ship>{

  populateModel(model: Ship): Ship {
    return {name : model.name, url: model.url, shipId : Ship._id(model.url)};
  }
  constructor(requestService: RequestService, config: BaseSettings) {
    super(requestService, config.API_SHIPS);
  }
}
