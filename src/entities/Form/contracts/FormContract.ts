import {
    FormValidateErrorListInterface
} from "../../../services/FormValidateService/interfaces/FormValidateErrorListInterface";
import {StringObjInterface} from "../../../interfaces/StringObjInterface";

export interface FormContract {
    validate(): FormValidateErrorListInterface | true;
    submit(): void;
    clear(): void;
    setRuleList(ruleList: StringObjInterface): void;
}