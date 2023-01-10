import {FormContract} from "./contracts/FormContract";
import {FormValidateServiceContract} from "../../services/FormValidateService/contracts/FormValidateServiceContract";
import {StringObjInterface} from "../../interfaces/StringObjInterface";
import {ValidateErrorListInterface} from "../../services/ValidateService/interfaces/ValidateErrorListInterface";
import {AnyObjInterface} from "../../interfaces/AnyObjInterface";
import {ModalContract} from "../Modal/contracts/ModalContract";
import {AxiosServiceContract} from "../../services/AxiosService/contracts/AxiosServiceContract";
import {Entity} from "../Entity";
import {JSToolsAbstractMap} from "../../app/JSToolsAbstractMap";

export abstract class Form extends Entity implements FormContract {
    protected serviceDependsList: string[] = [
        JSToolsAbstractMap.TranslateServiceContract,
        JSToolsAbstractMap.AxiosServiceContract,
    ];
    private modal: ModalContract | null = null;
    protected validateService: FormValidateServiceContract;
    protected formId: string;
    protected formSubmit: boolean;
    protected ruleList: StringObjInterface = {};
    protected isSending: boolean;

    constructor(formId: string, formSubmit: boolean, validateService: FormValidateServiceContract) {
        super();
        this.formId = formId;
        this.formSubmit = formSubmit;
        this.isSending = false;
        this.validateService = validateService;
    }

    protected abstract clearErrors(): void;
    protected abstract showErrors(errorList: ValidateErrorListInterface): void;
    protected abstract getMethod(): string;
    protected abstract getAction(): string;
    protected abstract getToken(): string;
    protected abstract callFormSubmit(): void;
    protected abstract disableSubmitBtn(): void;
    protected abstract disableFieldsInput(): void;
    protected abstract showSpinner(): void;
    public abstract serialize(): AnyObjInterface;

    public abstract setSubmitButton(button: any): void;
    public abstract enableSubmitOnEnter(): void;

    public clear(): void {
        this.clearErrors();
    }

    public attachToModal(modal: ModalContract) {
        this.modal = modal;
    }

    public submit(): void {
        this.clear();
        let errorList = this.validate();
        if (errorList !== true) {
            this.showErrors(errorList);
        } else {
            if (this.formSubmit) {
                this.showSpinner();
                this.disableSubmitBtn();
                this.disableFieldsInput();
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
        if (this.modal == null) {}
        this.isSending = true;
        this.showSpinner();
        this.disableSubmitBtn();
        this.disableFieldsInput();

        let send = axiosService.send({
            url: this.getAction(),
            method: this.getMethod(),
            data: this.serialize(),
        }, {}, false);
    }

    public setRuleList(ruleList: StringObjInterface): void {
        this.ruleList = ruleList;
    }
}
