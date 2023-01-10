import {CallbackListInterface} from "../interfaces/CallbackListInterface";

export interface AxiosServiceContract {
    send(data: any, callbackList: CallbackListInterface, noty: boolean): any;
}