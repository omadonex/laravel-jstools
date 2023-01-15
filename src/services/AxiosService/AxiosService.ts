import {AxiosServiceContract} from "./contracts/AxiosServiceContract";
import axios from "axios";
import {NotyServiceContract} from "../NotyService/contracts/NotyServiceContract";
import {CallbackListInterface} from "./interfaces/CallbackListInterface";
import {Service} from "../Service";
import {JSToolsAbstractMap} from "../../app/JSToolsAbstractMap";
import {FormContract} from "../../entities/Form/contracts/FormContract";
import {ContextTypeEnum} from "../../types/ContextTypeEnum";

export class AxiosService extends Service implements AxiosServiceContract {

    protected serviceDependsList: string[] = [
        JSToolsAbstractMap.NotyServiceContract,
    ];

    public async send(config: any, callbackList: CallbackListInterface, showNoty: boolean = true, form?: FormContract) {
        let notyService: NotyServiceContract = this.getService(JSToolsAbstractMap.NotyServiceContract);

        if (typeof callbackList.start === 'function') {
            callbackList.start();
        }

        try {
            const { data } = await axios.request(config);

            if (typeof callbackList.finish === 'function') {
                callbackList.finish();
            }

            if (data.status === true) {
                if (typeof callbackList.success === 'function') {
                    callbackList.success();
                }

                if (showNoty && data.noty) {
                    notyService.show({
                        context: ContextTypeEnum.success,
                        message: data.noty,
                    });
                }
            } else {
                if (showNoty && data.noty) {
                    notyService.show({
                        context: ContextTypeEnum.danger,
                        message: data.noty,
                    });
                }
            }

            return { result: true, data: data };
        } catch (error: any) {
            if (typeof callbackList.finish === 'function') {
                callbackList.finish();
            }

            if (error.response.status === 422) {
                if (typeof callbackList.error === 'function') {
                    callbackList.error(error.response.data.errors);
                }
                error.response.data.status = false;

                return { result: false, data: error.response.data };
            }

            console.log('AxiosService:: unexpected error', error);

            return { result: false, data: error.message };
        }
    }
}