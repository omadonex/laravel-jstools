import { Service } from 'laravel-jstools-di';

import { NotyServiceContract } from './contracts/NotyServiceContract';
import { NotyDataInterface } from './interfaces/NotyDataInterface';

export class AlertNotyService extends Service implements NotyServiceContract {
  public show(data: NotyDataInterface): void {
    alert(data.message);
  }
}
