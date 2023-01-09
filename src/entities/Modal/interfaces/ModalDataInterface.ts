import {ModalSubmitDataInterface} from "./ModalSubmitDataInterface";

export interface ModalDataInterface {
    title?: string,
    submitText?: string,
    cancelText?: string,
    bodyText?: string,
    openDataUrl?: string,
    submitCallback?: () => any,
    submitData?: ModalSubmitDataInterface,
}