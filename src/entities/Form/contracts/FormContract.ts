import {StringObjInterface} from "../../../interfaces/StringObjInterface";
import {ValidateErrorListInterface} from "../../../services/ValidateService/interfaces/ValidateErrorListInterface";

export interface FormContract {
    validate(): ValidateErrorListInterface | true;
    submit(): void;
    clear(): void;
    setRuleList(ruleList: StringObjInterface): void;
    setSubmitButton(button: any): void;
    enableSubmitOnEnter(): void;
}