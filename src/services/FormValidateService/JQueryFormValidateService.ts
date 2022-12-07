import {FormValidateServiceContract} from "./contracts/FormValidateServiceContract";
import ValidateService from "../ValidateService/ValidateService";
import * as $ from "jquery";
import {ValidateErrorListInterface} from "../ValidateService/interfaces/ValidateErrorListInterface";
import ValidateError from "../ValidateService/ValidateError";
import {AnyObjInterface} from "../../interfaces/AnyObjInterface";

export default class JQueryFormValidateService extends ValidateService implements FormValidateServiceContract {
    validateForm(form: any): ValidateErrorListInterface | true {
        let errorList: AnyObjInterface = {};
        form.find('input[jst-validate]').each((index: number, element: any) => {
            let $input = $(element);
            let field: string = $input.data('jst-field');
            errorList[field] = this.validateField($input);
        });

        return Object.keys(errorList).length === 0 ? true : errorList;
    }

    validateField(input: any): ValidateErrorListInterface {
        let errorList: ValidateErrorListInterface = this.validate(input.val(), input.data('jst-validate'));
        for (let rule in errorList) {
            let error: ValidateError = errorList[rule];
            error.addReplace('attribute', input.data('jst-field'));
        }

        return errorList;
    }
}