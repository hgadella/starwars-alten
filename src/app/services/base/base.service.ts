import { RequestService } from '../request/request.service';
export abstract class IBaseService
{
  abstract populateModel(model: any);
  abstract get(data?: string): any;
}
export abstract class BaseService<T> implements IBaseService {

  protected collectionInfo: any;
  protected items;
  constructor(protected requestsService: RequestService, protected url: string) { }

  abstract populateModel(model: T): T;

  public get(data?: string): any {
    const response = this.requestsService.get(this.url + (data ? data : ''));
    return response;
  }
}
