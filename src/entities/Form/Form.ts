import {FormContract} from "./contracts/FormContract";
import {FormValidateServiceContract} from "../../services/FormValidateService/contracts/FormValidateServiceContract";
import {ValidateErrorListInterface} from "../../services/ValidateService/interfaces/ValidateErrorListInterface";
import {TranslateServiceContract} from "../../services/TranslateService/contracts/TranslateServiceContract";

export default abstract class Form implements FormContract {
    protected validateService: FormValidateServiceContract;
    protected translateService: TranslateServiceContract;
    protected form: any;
    protected defaultSubmit: boolean;

    constructor(form: any, defaultSubmit: boolean, validateService: FormValidateServiceContract, translateService: TranslateServiceContract) {
        this.validateService = validateService;
        this.translateService = translateService;
        this.form = form;
        this.defaultSubmit = defaultSubmit;
    }

    protected abstract clearErrors(): void;
    protected abstract showErrors(errorList: ValidateErrorListInterface): void;
    protected abstract getMethod(): string;
    protected abstract getAction(): string;
    protected abstract getToken(): string;
    protected abstract callDefaultSubmit(): void;

    public clear(): void {
        this.clearErrors();
    }

    public submit(): void {
        this.clear();
        let errorList = this.validate();
        if (errorList !== true) {
            this.showErrors(errorList);
        } else {
            if (this.defaultSubmit) {
                this.callDefaultSubmit();
            } else {
                this.doSubmit();
            }
        }
    }

    public validate(): ValidateErrorListInterface | true {
        return this.validateService.validateForm(this.form);
    }

    private doSubmit(): void {

    }
}
