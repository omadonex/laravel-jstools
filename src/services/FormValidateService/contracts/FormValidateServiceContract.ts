import {ValidateServiceContract} from "../../ValidateService/contracts/ValidateServiceContract";
import {ValidateErrorListInterface} from "../../ValidateService/interfaces/ValidateErrorListInterface";
import {RuleListInterface} from "../../ValidateService/interfaces/RuleListInterface";

export interface FormValidateServiceContract extends ValidateServiceContract {
    validateForm(form: any, ruleList?: RuleListInterface): ValidateErrorListInterface | true;
}