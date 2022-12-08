import {ServiceListInterface} from "./ServiceListInterface";

export abstract class Service {
    protected serviceList: ServiceListInterface = {};
    protected serviceDependsList: string[] = [];

    public getServiceDependsList(): string[] {
        return this.serviceDependsList;
    }

    public setServiceList(serviceList: ServiceListInterface): void {
        this.serviceList = serviceList;
    }

    protected getService(serviceName: string): any {
        return this.serviceList[serviceName];
    }
}