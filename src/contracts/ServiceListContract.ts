import { ServiceListInterface } from '../interfaces/ServiceListInterface';

export interface ServiceListContract {
  getServiceDependsList(): string[];
  setServiceList(serviceList: ServiceListInterface): void;
  getService(serviceName: string): any;
}
