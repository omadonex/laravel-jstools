import {JSToolsAbstractMap} from "../JSToolsAbstractMap";
import {ServiceProvider} from "../../di/ServiceProvider";
import {TranslateService} from "../../services/TranslateService/TranslateService";
import {ConsoleNotyService} from "../../services/NotyService/ConsoleNotyService";
import {AxiosService} from "../../services/AxiosService/AxiosService";
import {FormContract} from "../../entities/Form/contracts/FormContract";
import {EntityTypeEnum} from "../../entities/EntityTypeEnum";
import {JQueryForm} from "../../entities/Form/JQueryForm";
import {ModalContract} from "../../entities/Modal/contracts/ModalContract";
import {BS52Modal} from "../../entities/Modal/BS52Modal";

export class AppServiceProvider extends ServiceProvider {
    public register(): void {
        this.singleton(JSToolsAbstractMap.AxiosServiceContract, (): any => {
            return new AxiosService();
        })

        this.singleton(JSToolsAbstractMap.TranslateServiceContract, (): any => {
            return new TranslateService({
                langDefault: this.appData.lang.default,
                langCurrent: this.appData.lang.current,
                translationList: this.appData.lang.translationList,
            });
        });

        this.alias(JSToolsAbstractMap.TranslateServiceContract, 't');

        this.singleton(JSToolsAbstractMap.NotyServiceContract, (): any => {
            return new ConsoleNotyService();
        });

        this.bind(JSToolsAbstractMap.FormContract, (params: any): FormContract => {
            switch (params.entityType) {
                case EntityTypeEnum.bs_5_2:
                    return new JQueryForm(params.formId, params.formSubmit);
            }

            return new JQueryForm(params.formId, params.formSubmit);
        });

        this.bind(JSToolsAbstractMap.ModalContract, (params: any): ModalContract => {
            switch (params.entityType) {
                case EntityTypeEnum.bs_5_2:
                    return new BS52Modal(params.modalId, params.modalData, params.modalUsage, params.tools);
            }

            return new BS52Modal(params.modalId, params.modalData, params.modalUsage, params.tools);
        });
    }
}