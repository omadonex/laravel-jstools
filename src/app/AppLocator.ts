import {ServiceContainer} from "../di/ServiceContainer";
import {AppServiceProvider} from "./providers/AppServiceProvider";
import {ServiceProviderContract} from "../di/contracts/ServiceProviderContract";
import {FormContract} from "../entities/Form/contracts/FormContract";
import {JSToolsAbstractMap} from "./JSToolsAbstractMap";
import {ModalContract} from "../entities/Modal/contracts/ModalContract";
import {ModalDataInterface} from "../entities/Modal/interfaces/ModalDataInterface";
import {ModalUsageEnum} from "../entities/Modal/ModalUsageEnum";
import {EntityTypeEnum} from "../entities/EntityTypeEnum";
import {NotyDataInterface} from "../services/NotyService/interfaces/NotyDataInterface";
import {NotyServiceContract} from "../services/NotyService/contracts/NotyServiceContract";
import {FormDataInterface} from "../entities/Form/interfaces/FormDataInterface";

export class AppLocator {
    private globalData: any;
    private serviceContainer: ServiceContainer;
    private providerList: ServiceProviderContract[] = [];

    constructor(globalData: any) {
        this.globalData = globalData;
        this.serviceContainer = new ServiceContainer;
        this.registerProvider(new AppServiceProvider);
    }

    public registerProvider(provider: ServiceProviderContract): void {
        provider.setAppData(this.globalData);
        provider.register();
        this.providerList.push(provider);
        this.generateMaps();
    }

    public make(name: string): any {
        return this.serviceContainer.make(name);
    }

    public makeEntity(name: string, entityType: EntityTypeEnum, params: any): any {
        return this.serviceContainer.makeEntity(name, entityType, params);
    }

    public form(formId: string, formData: FormDataInterface, showNoty: boolean, entityType: EntityTypeEnum): FormContract {
        return this.makeEntity(JSToolsAbstractMap.FormContract, entityType, { formId, formData, showNoty });
    }

    public modal(modalId: string, modalUsage: ModalUsageEnum, modalData: ModalDataInterface, showNoty: boolean, tools: any, entityType: EntityTypeEnum): ModalContract {
        return this.makeEntity(JSToolsAbstractMap.ModalContract, entityType, { modalId, modalUsage, modalData, showNoty, tools });
    }

    public noty(data: NotyDataInterface): void {
        (this.make(JSToolsAbstractMap.NotyServiceContract) as NotyServiceContract).show(data);
    }

    private generateMaps(): void {
        let classMap = {};
        let aliasMap = {};

        this.providerList.forEach((provider, i, arr) => {
            classMap = Object.assign(classMap, provider.getClassMap());
            aliasMap = Object.assign(aliasMap, provider.getAliasMap());
        });

        this.serviceContainer.setMaps(classMap, aliasMap);
    }
}