import {ValidateServiceContract} from "../../ValidateService/contracts/ValidateServiceContract";
import {ValidateErrorListInterface} from "../../ValidateService/interfaces/ValidateErrorListInterface";
import {FormValidateErrorListInterface} from "../interfaces/FormValidateErrorListInterface";

export interface FormValidateServiceContract extends ValidateServiceContract {
    validateForm(form: any): FormValidateErrorListInterface |  true;
    validateField(input: any): ValidateErrorListInterface;
}