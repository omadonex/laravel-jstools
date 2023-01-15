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

export class AppLocator {
    private globalData: any;
    private serviceContainer: ServiceContainer;
    private providerList: ServiceProviderContract[] = [];

    constructor(globalData: any) {
        this.globalData = globalData;
        this.serviceContainer = new ServiceContainer;
        this.registerProvider(new AppServiceProvider);
    }

    registerProvider(provider: ServiceProviderContract): void {
        provider.setAppData(this.globalData);
        provider.register();
        this.providerList.push(provider);
        this.generateMaps();
    }

    make(name: string): any {
        return this.serviceContainer.make(name);
    }

    makeEntity(name: string, entityType: EntityTypeEnum, params: any): any {
        return this.serviceContainer.makeEntity(name, entityType, params);
    }

    form(formId: string, formSubmit: boolean, withoutSubmitBtn: boolean, showNoty: boolean, entityType: EntityTypeEnum): FormContract {
        return this.makeEntity(JSToolsAbstractMap.FormContract, entityType, { formId: formId, formSubmit: formSubmit, withoutSubmitBtn: withoutSubmitBtn, showNoty: showNoty });
    }

    modal(modalId: string, modalData: ModalDataInterface, modalUsage: ModalUsageEnum, showNoty: boolean, tools: any, entityType: EntityTypeEnum): ModalContract {
        return this.makeEntity(JSToolsAbstractMap.ModalContract, entityType, { modalId: modalId, modalData: modalData, modalUsage: modalUsage, showNoty: showNoty, tools: tools });
    }

    noty(data: NotyDataInterface): void {
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