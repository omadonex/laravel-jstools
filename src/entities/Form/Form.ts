import {FormContract} from "./contracts/FormContract";
import {FormValidateServiceContract} from "../../services/FormValidateService/contracts/FormValidateServiceContract";
import {TranslateServiceContract} from "../../services/TranslateService/contracts/TranslateServiceContract";
import {
    FormValidateErrorListInterface
} from "../../services/FormValidateService/interfaces/FormValidateErrorListInterface";

export default abstract class Form implements FormContract {
    protected validateService: FormValidateServiceContract;
    protected translateService: TranslateServiceContract;
    protected form: any;
    protected formSubmit: boolean;

    constructor(form: any, formSubmit: boolean, validateService: FormValidateServiceContract, translateService: TranslateServiceContract) {
        this.validateService = validateService;
        this.translateService = translateService;
        this.form = form;
        this.formSubmit = formSubmit;
    }

    protected abstract clearErrors(): void;
    protected abstract showErrors(errorList: FormValidateErrorListInterface): void;
    protected abstract getMethod(): string;
    protected abstract getAction(): string;
    protected abstract getToken(): string;
    protected abstract callFormSubmit(): void;
    protected abstract disableSubmitBtn(): void;
    protected abstract disableFieldsInput(): void;
    protected abstract showSpinner(): void;

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

    public validate(): FormValidateErrorListInterface | true {
        return this.validateService.validateForm(this.form);
    }

    private doSubmit(): void {

    }
}
