import ValidateError from "../ValidateError";

export interface RuleCheckerInterface {
    (value: string, paramList?: any): ValidateError | true;
}