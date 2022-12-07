import {ValidateErrorListInterface} from "../interfaces/ValidateErrorListInterface";

export interface ValidateServiceContract {
    validate(value: string, ruleStr: string): ValidateErrorListInterface;
}