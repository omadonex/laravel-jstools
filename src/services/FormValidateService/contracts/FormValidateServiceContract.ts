import {ValidateServiceContract} from "../../ValidateService/contracts/ValidateServiceContract";
import {ValidateErrorListInterface} from "../../ValidateService/interfaces/ValidateErrorListInterface";

export interface FormValidateServiceContract extends ValidateServiceContract {
    validateForm(form: any): ValidateErrorListInterface |  true;
    validateField(input: any): ValidateErrorListInterface;
}