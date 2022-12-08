import {ValidateError} from "../ValidateError";

export interface ValidateErrorListInterface {
    [field: string]: {
        [rule: string]: ValidateError,
    };
}