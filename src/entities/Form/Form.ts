import {FormContract} from "./contracts/FormContract";
import {FormValidateServiceContract} from "../../services/FormValidateService/contracts/FormValidateServiceContract";
import {StringObjInterface} from "../../interfaces/StringObjInterface";
import {ValidateErrorListInterface} from "../../services/ValidateService/interfaces/ValidateErrorListInterface";
import {AnyObjInterface} from "../../interfaces/AnyObjInterface";
import {ModalContract} from "../Modal/contracts/ModalContract";
import {AxiosServiceContract} from "../../services/AxiosService/contracts/AxiosServiceContract";
import {Entity} from "../Entity";
import {JSToolsAbstractMap} from "../../app/JSToolsAbstractMap";
import {CallbackListInterface} from "../../services/AxiosService/interfaces/CallbackListInterface";
import {ValidateError} from "../../services/ValidateService/ValidateError";
import {ContextTypeEnum} from "../../types/ContextTypeEnum";

export abstract class Form extends Entity implements FormContract {
    protected serviceDependsList: string[] = [
        JSToolsAbstractMap.TranslateServiceContract,
        JSToolsAbstractMap.AxiosServiceContract,
    ];
    private modal: ModalContract | null = null;
    protected validateService: FormValidateServiceContract;
    protected formId: string;
    protected formSubmit: boolean;
    protected showNoty: boolean;
    protected withoutSubmitBtn: boolean;
    protected ruleList: StringObjInterface = {};
    protected isSending: boolean;

    constructor(formId: string, formSubmit: boolean, withoutSubmitBtn: boolean, showNoty: boolean, validateService: FormValidateServiceContract) {
        super();
        this.formId = formId;
        this.formSubmit = formSubmit;
        this.withoutSubmitBtn = withoutSubmitBtn;
        this.showNoty = showNoty;
        this.isSending = false;
        this.validateService = validateService;
    }

    protected abstract showErrors(errorList: ValidateErrorListInterface): void;
    protected abstract clearErrors(): void;
    protected abstract showAlerts(alertList: string[], contextType: ContextTypeEnum): void;
    protected abstract clearAlerts(): void;
    protected abstract clearInputs(): void;
    protected abstract getMethod(): string;
    protected abstract getAction(): string;
    protected abstract getToken(): string;
    protected abstract callFormSubmit(): void;
    protected abstract showSubmitBtn(): void;
    protected abstract hideSubmitBtn(): void;
    protected abstract disableSubmitBtn(): void;
    protected abstract enableSubmitBtn(): void;
    protected abstract disableFieldsInput(): void;
    protected abstract enableFieldsInput(): void;
    protected abstract showSpinner(): void;
    protected abstract hideSpinner(): void;
    public abstract serialize(): AnyObjInterface;

    public abstract setSubmitButton(button: any): void;
    public abstract enableSubmitOnEnter(): void;

    public clear(): void {
        this.clearErrors();
        this.clearInputs();
        this.clearAlerts();
    }

    public attachToModal(modal: ModalContract) {
        this.modal = modal;
    }

    private preSubmitActions(): void {
        if (this.modal === null) {
            this.showSpinner();
            this.disableSubmitBtn();
            this.disableFieldsInput();
        } else {
            this.modal.showSubmitSpinner();
            this.modal.disableButtons();
            this.modal.showOverlay();
        }
    }

    private afterSubmitActions(): void {
        if (this.modal === null) {
            this.hideSpinner();
            this.enableSubmitBtn();
            this.enableFieldsInput();
        } else {
            this.modal.hideSubmitSpinner();
            this.modal.enableButtons();
            this.modal.hideOverlay();
        }
    }

    public submit(): void {
        this.clearErrors();
        this.clearAlerts();
        let errorList = this.validate();
        if (errorList !== true) {
            this.showErrors(errorList);
        } else {
            if (this.formSubmit) {
                this.preSubmitActions();
                this.callFormSubmit();
            } else {
                this.doSubmit();
            }
        }
    }

    public validate(): ValidateErrorListInterface | true {
        return this.validateService.validateForm(this.formId, this.ruleList);
    }

    private doSubmit(): void {
        let axiosService: AxiosServiceContract = this.getService(JSToolsAbstractMap.AxiosServiceContract);
        let callbackList: CallbackListInterface = {
            start: () => {
                this.isSending = true;
                this.preSubmitActions();
            },
            finish: () => {
                this.isSending = false;
                this.afterSubmitActions();
            },
            success: () => {
                if (this.modal === null) {
                    this.clear();
                } else {
                    this.modal.hide();
                }
            },
            error: (errors: any) => {
                let errorList: ValidateErrorListInterface = {};
                let alertList: string[] = [];
                for (let field in errors) {
                    errorList[field] = {
                        rule: new ValidateError(field, 'rule', [], errors[field][0]),
                    };
                    alertList.push(errors[field][0]);
                }
                this.showErrors(errorList);
                this.showAlerts(alertList, ContextTypeEnum.danger);
            },
        }

        let send = axiosService.send({
            url: this.getAction(),
            method: this.getMethod(),
            data: this.serialize(),
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        }, callbackList, this.showNoty);

        send.then((res: any) => {
            if (res.result && !res.data.status) {
                this.showAlerts(res.data.errors, ContextTypeEnum.danger);
                return;
            }

            if (!res.result && typeof res.data.status === 'undefined') {
                this.showAlerts([res.data], ContextTypeEnum.warning);
            }
        });
    }

    public setRuleList(ruleList: StringObjInterface): void {
        this.ruleList = ruleList;
    }
}
