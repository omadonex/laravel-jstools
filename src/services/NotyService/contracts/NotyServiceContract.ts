import { NotyDataInterface } from '../interfaces/NotyDataInterface';

export interface NotyServiceContract {
  show(data: NotyDataInterface): void;
}
