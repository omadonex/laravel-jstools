import {ModalSubmitDataInterface} from "./ModalSubmitDataInterface";
import {FormContract} from "../../Form/contracts/FormContract";

export interface ModalDataInterface {
    title?: string,
    submitText?: string,
    cancelText?: string,
    bodyText?: string,
    openDataUrl?: string,
    submitCallback?: () => any,
    submitData?: ModalSubmitDataInterface,
}