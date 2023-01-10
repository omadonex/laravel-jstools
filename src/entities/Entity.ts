import {ServiceListContract} from "../contracts/ServiceListContract";
import {ServiceListInterface} from "../interfaces/ServiceListInterface";

export abstract class Entity implements ServiceListContract {
    protected serviceList: ServiceListInterface = {};
    protected serviceDependsList: string[] = [];

    public getServiceDependsList(): string[] {
        return this.serviceDependsList;
    }

    public setServiceList(serviceList: ServiceListInterface): void {
        this.serviceList = serviceList;
    }

    public getService(serviceName: string): any {
        return this.serviceList[serviceName];
    }
}