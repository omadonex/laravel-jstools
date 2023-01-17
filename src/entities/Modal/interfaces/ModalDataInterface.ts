import {RequestDataInterface} from "../../../interfaces/RequestDataInterface";

export interface ModalDataInterface {
    title?: string,
    submitText?: string,
    cancelText?: string,
    bodyCaption?: string,
    bodyText?: string,
    openDataUrl?: string,
    submitCallback?: () => any,
    submitData?: RequestDataInterface,
    preloadData?: RequestDataInterface,
    initDataCallback?: () => any,
}