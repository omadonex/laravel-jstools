import {
    FormValidateErrorListInterface
} from "../../../services/FormValidateService/interfaces/FormValidateErrorListInterface";

export interface FormContract {
    validate(): FormValidateErrorListInterface | true;
    submit(): void;
    clear(): void;
}