import {FormContract} from "./contracts/FormContract";
import {FormValidateServiceContract} from "../../services/FormValidateService/contracts/FormValidateServiceContract";
import {TranslateServiceContract} from "../../services/TranslateService/contracts/TranslateServiceContract";
import {StringObjInterface} from "../../interfaces/StringObjInterface";
import {ValidateErrorListInterface} from "../../services/ValidateService/interfaces/ValidateErrorListInterface";

export abstract class Form implements FormContract {
    protected validateService: FormValidateServiceContract;
    protected translateService: TranslateServiceContract;
    protected form: any;
    protected formSubmit: boolean;
    protected ruleList: StringObjInterface = {};

    constructor(form: any, formSubmit: boolean, validateService: FormValidateServiceContract, translateService: TranslateServiceContract) {
        this.validateService = validateService;
        this.translateService = translateService;
        this.form = form;
        this.formSubmit = formSubmit;
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

    public abstract setSubmitButton(button: any): void;
    public abstract enableSubmitOnEnter(): void;

    public clear(): void {
        this.clearErrors();
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
        return this.validateService.validateForm(this.form, this.ruleList);
    }

    private doSubmit(): void {

    }

    public setRuleList(ruleList: StringObjInterface): void {
        this.ruleList = ruleList;
    }
}
