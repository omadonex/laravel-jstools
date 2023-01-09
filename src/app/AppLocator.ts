import {ServiceContainer} from "../di/ServiceContainer";
import {AppServiceProvider} from "./providers/AppServiceProvider";
import {ServiceProviderContract} from "../di/contracts/ServiceProviderContract";
import {FormContract} from "../entities/Form/contracts/FormContract";
import {FormTypeEnum} from "../entities/Form/FormTypeEnum";
import {JQueryForm} from "../entities/Form/JQueryForm";
import {JSToolsAbstractMap} from "./JSToolsAbstractMap";
import {JQueryFormValidateService} from "../services/FormValidateService/JQueryFormValidateService";
import {JST_UndefinedFormTypeException} from "../exceptions/JST_UndefinedFormTypeException";
import {ModalTypeEnum} from "../entities/Modal/ModalTypeEnum";
import {ModalContract} from "../entities/Modal/contracts/ModalContract";
import {JST_UndefinedModalTypeException} from "../exceptions/JST_UndefinedModalTypeException";
import {BS52Modal} from "../entities/Modal/BS52Modal";
import {ModalDataInterface} from "../entities/Modal/interfaces/ModalDataInterface";
import {ModalUsageEnum} from "../entities/Modal/ModalUsageEnum";

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

    form(form: any, formSubmit: boolean, formType: FormTypeEnum = FormTypeEnum.jquery): FormContract {
        switch (formType) {
            case FormTypeEnum.jquery: return new JQueryForm(form, formSubmit, new JQueryFormValidateService, this.make(JSToolsAbstractMap.TranslateServiceContract));
        }

        throw JST_UndefinedFormTypeException("Undefined form type! Check FormTypeEnum for available types!");
    }

    modal(modalId: string, modalData: ModalDataInterface, modalUsage: ModalUsageEnum, modalType: ModalTypeEnum, tools: any): ModalContract {
        switch (modalType) {
            case ModalTypeEnum.bs_5_2: return new BS52Modal(modalId, modalData, modalUsage, tools, this.make(JSToolsAbstractMap.NotyServiceContract));
        }

        throw JST_UndefinedModalTypeException("Undefined modal type! Check ModalTypeEnum for available types!");
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