import {FormContract} from "./contracts/FormContract";
import {FormValidateServiceContract} from "../../services/FormValidateService/contracts/FormValidateServiceContract";
import {ValidateErrorListInterface} from "../../services/ValidateService/interfaces/ValidateErrorListInterface";
import {TranslateServiceContract} from "../../services/TranslateService/contracts/TranslateServiceContract";

export default abstract class Form implements FormContract {
    protected validateService: FormValidateServiceContract;
    protected translateService: TranslateServiceContract;
    protected form: any;

    constructor(form: any, validateService: FormValidateServiceContract, translateService: TranslateServiceContract) {
        this.validateService = validateService;
        this.translateService = translateService;
        this.form = form;
    }

    protected abstract clearErrors(): void;
    protected abstract showErrors(errorList: ValidateErrorListInterface): void;

    public clear(): void {
        this.clearErrors();
    }

    public submit(): void {
        this.clear();
        let errorList = this.validate();
        if (errorList !== true) {
            this.showErrors(errorList);
        } else {

        }
    }

    public validate(): ValidateErrorListInterface | true {
        return this.validateService.validateForm(this.form);
    }
}
