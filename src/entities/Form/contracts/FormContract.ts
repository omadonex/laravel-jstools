import {StringObjInterface} from "../../../interfaces/StringObjInterface";
import {ValidateErrorListInterface} from "../../../services/ValidateService/interfaces/ValidateErrorListInterface";
import {AnyObjInterface} from "../../../interfaces/AnyObjInterface";
import {ModalContract} from "../../Modal/contracts/ModalContract";

export interface FormContract {
    validate(): ValidateErrorListInterface | true;
    submit(): void;
    clear(): void;
    setRuleList(ruleList: StringObjInterface): void;
    setSubmitButton(button: any): void;
    enableSubmitOnEnter(): void;
    serialize(): AnyObjInterface;
    attachToModal(modal: ModalContract): void;
    setInitData(data: AnyObjInterface): void;
    setMethod(method: string): void;
    setAction(action: string): void;
    getMethod(): string;
    getAction(): string;
    getToken(): string;
}