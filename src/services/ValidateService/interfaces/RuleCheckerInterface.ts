import {ValidateError} from "../ValidateError";
import {AnyObjInterface} from "../../../interfaces/AnyObjInterface";

export type RuleCheckerInterface = (data: AnyObjInterface, field: string, paramList?: any) => ValidateError | true;