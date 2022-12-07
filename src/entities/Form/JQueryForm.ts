import * as $ from "jquery";

import {FormValidateServiceContract} from "../../services/FormValidateService/contracts/FormValidateServiceContract";
import Form from "./Form";
import {ValidateErrorListInterface} from "../../services/ValidateService/interfaces/ValidateErrorListInterface";
import ValidateError from "../../services/ValidateService/ValidateError";
import {TranslateServiceContract} from "../../services/TranslateService/contracts/TranslateServiceContract";

export default class JQueryForm extends Form {
    private $form: any;
    private $inputList: any;

    constructor(form: any, defaultSubmit: boolean, validateService: FormValidateServiceContract, translateService: TranslateServiceContract) {
        super(form, defaultSubmit, validateService, translateService);
        this.$form = this.form;
        this.$inputList = this.$form.find('input[data-jst-validate]');
    }

    protected showErrors(errorList: ValidateErrorListInterface): void {
        this.clearErrors();

        this.$inputList.each((index: number, element: any) => {
            let $input = $(element);
            let field = $input.data('jstField');
            if (field in errorList) {
                if (Object.keys(errorList[field]).length > 0) {
                    let $divError = this.form.find(`.invalid-feedback[data-jst-field="${field}"]`);
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
        this.$inputList.removeClass('is-valid is-invalid');
    }

    protected getMethod(): string {
        return this.$form.attr('method');
    }

    protected getAction(): string {
        return this.$form.attr('action');
    }

    protected getToken(): string {
        return this.$form.find('input[name=_token]')[0].val();
    }

    protected callDefaultSubmit(): void {
        this.$form.submit();
    }
}
