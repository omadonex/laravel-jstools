import * as $ from "jquery";

import {FormValidateServiceContract} from "./contracts/FormValidateServiceContract";
import ValidateService from "../ValidateService/ValidateService";
import {ValidateErrorListInterface} from "../ValidateService/interfaces/ValidateErrorListInterface";
import ValidateError from "../ValidateService/ValidateError";
import {FormValidateErrorListInterface} from "./interfaces/FormValidateErrorListInterface";
import {StringObjInterface} from "../../interfaces/StringObjInterface";
import {isEmpty} from "../../scripts/helpers";

export default class JQueryFormValidateService extends ValidateService implements FormValidateServiceContract {
    validateForm(form: any, ruleList: StringObjInterface = {}): FormValidateErrorListInterface | true {
        let errorList: FormValidateErrorListInterface = {};
        form.find('input[data-jst-field]').each((index: number, element: any) => {
            let $input = $(element);
            let field: string = $input.data('jstField');
            let fieldErrorList: ValidateErrorListInterface = this.validateField($input, ruleList);
            if (!isEmpty(fieldErrorList)) {
                errorList[field] = fieldErrorList;
            }
        });

        return isEmpty(errorList) ? true : errorList;
    }

    validateField(input: any, ruleList: StringObjInterface = {}): ValidateErrorListInterface {
        let ruleStr = isEmpty(ruleList) ? input.data('jstValidate') : ruleList[input.data('jstField')];
        ruleStr = typeof ruleStr === 'string' ? ruleStr : '';
        let errorList: ValidateErrorListInterface = this.validate(input.val(), ruleStr);
        for (let rule in errorList) {
            let error: ValidateError = errorList[rule];
            error.addReplace('attribute', input.data('jstField'));
        }

        return errorList;
    }
}