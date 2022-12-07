import {FormValidateServiceContract} from "../../services/FormValidateService/contracts/FormValidateServiceContract";
import Form from "./Form";
import {ValidateErrorListInterface} from "../../services/ValidateService/interfaces/ValidateErrorListInterface";
import ValidateError from "../../services/ValidateService/ValidateError";
import {TranslateServiceContract} from "../../services/TranslateService/contracts/TranslateServiceContract";

export default class JQueryForm extends Form {
    private inputList: any;

    constructor(form: any, validateService: FormValidateServiceContract, translateService: TranslateServiceContract) {
        super(form, validateService, translateService);
        this.inputList = this.form.find('input[jst-validate]');
    }

    protected showErrors(errorList: ValidateErrorListInterface): void {
        this.clearErrors();

        this.inputList.each((index: number, element: any) => {
            let $input = $(element);
            let field = $input.data('jst-field');
            if (field in errorList) {
                if (Object.keys(errorList[field]).length > 0) {
                    let $divError = this.form.find(`.invalid-feedback[jst-field="${field}"]`);
                    let error: ValidateError = Object.values(errorList[field])[0];
                    $divError.text(error.toText(this.translateService));
                    $input.addClass('is-invalid');
                } else {
                    $input.addClass('is-valid');
                }
            }
        });
    }

    protected clearErrors(): void {
        this.inputList.removeClass('is-valid is-invalid');
    }
}
