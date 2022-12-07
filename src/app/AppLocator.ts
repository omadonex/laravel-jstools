import ServiceContainer from "../di/ServiceContainer";
import AppServiceProvider from "./providers/AppServiceProvider";
import {ServiceProviderContract} from "../di/contracts/ServiceProviderContract";
import {FormContract} from "../entities/Form/contracts/FormContract";
import {FormTypeEnum} from "../entities/Form/FormTypeEnum";
import JQueryForm from "../entities/Form/JQueryForm";
import {JSToolsAbstractMap} from "./JSToolsAbstractMap";
import JQueryFormValidateService from "../services/FormValidateService/JQueryFormValidateService";

export default class AppLocator {
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

    form(form: any, formType: FormTypeEnum = FormTypeEnum.jquery): FormContract {
        switch (formType) {
            case FormTypeEnum.jquery: return new JQueryForm(form, new JQueryFormValidateService, this.make(JSToolsAbstractMap.TranslateServiceContract));
        }
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