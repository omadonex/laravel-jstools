import {ValidateErrorListInterface} from "../../../services/ValidateService/interfaces/ValidateErrorListInterface";

export interface FormContract {
    validate(): ValidateErrorListInterface | true;
    submit(): void;
    clear(): void;
}