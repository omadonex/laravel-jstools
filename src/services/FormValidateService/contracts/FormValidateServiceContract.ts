import {ValidateServiceContract} from "../../ValidateService/contracts/ValidateServiceContract";
import {ValidateErrorListInterface} from "../../ValidateService/interfaces/ValidateErrorListInterface";
import {FormValidateErrorListInterface} from "../interfaces/FormValidateErrorListInterface";
import {StringObjInterface} from "../../../interfaces/StringObjInterface";

export interface FormValidateServiceContract extends ValidateServiceContract {
    validateForm(form: any, ruleList: StringObjInterface): FormValidateErrorListInterface |  true;
    validateField(input: any, ruleList: StringObjInterface): ValidateErrorListInterface;
}