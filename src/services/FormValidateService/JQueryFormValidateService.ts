import * as $ from "jquery";

import {FormValidateServiceContract} from "./contracts/FormValidateServiceContract";
import ValidateService from "../ValidateService/ValidateService";
import {ValidateErrorListInterface} from "../ValidateService/interfaces/ValidateErrorListInterface";
import ValidateError from "../ValidateService/ValidateError";
import {FormValidateErrorListInterface} from "./interfaces/FormValidateErrorListInterface";

export default class JQueryFormValidateService extends ValidateService implements FormValidateServiceContract {
    validateForm(form: any): FormValidateErrorListInterface | true {
        let errorList: FormValidateErrorListInterface = {};
        form.find('input[data-jst-validate]').each((index: number, element: any) => {
            let $input = $(element);
            let field: string = $input.data('jstField');
            let fieldErrorList: ValidateErrorListInterface = this.validateField($input);
            if (Object.keys(fieldErrorList).length > 0) {
                errorList[field] = this.validateField($input);
            }
        });

        return Object.keys(errorList).length === 0 ? true : errorList;
    }

    validateField(input: any): ValidateErrorListInterface {
        let errorList: ValidateErrorListInterface = this.validate(input.val(), input.data('jstValidate'));
        for (let rule in errorList) {
            let error: ValidateError = errorList[rule];
            error.addReplace('attribute', input.data('jstField'));
        }

        return errorList;
    }
}