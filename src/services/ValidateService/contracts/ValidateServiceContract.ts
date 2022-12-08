import {ValidateErrorListInterface} from "../interfaces/ValidateErrorListInterface";
import {AnyObjInterface} from "../../../interfaces/AnyObjInterface";
import {StringObjInterface} from "../../../interfaces/StringObjInterface";

export interface ValidateServiceContract {
    validate(data: AnyObjInterface, ruleList: StringObjInterface): ValidateErrorListInterface | true;
}