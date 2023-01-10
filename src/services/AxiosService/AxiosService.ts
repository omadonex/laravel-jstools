import {AxiosServiceContract} from "./contracts/AxiosServiceContract";
import axios from "axios";
import {NotyServiceContract} from "../NotyService/contracts/NotyServiceContract";
import {NotyTypeEnum} from "../NotyService/NotyTypeEnum";
import {CallbackListInterface} from "./interfaces/CallbackListInterface";
import {Service} from "../Service";
import {JSToolsAbstractMap} from "../../app/JSToolsAbstractMap";
import {FormContract} from "../../entities/Form/contracts/FormContract";

export class AxiosService extends Service implements AxiosServiceContract {

    protected serviceDependsList: string[] = [
        JSToolsAbstractMap.NotyServiceContract,
    ];

    public async send(config: any, callbackList: CallbackListInterface, noty: boolean = true, form?: FormContract) {
        let notyService: NotyServiceContract = this.getService(JSToolsAbstractMap.NotyServiceContract);

        if (typeof callbackList.start === 'function') {
            callbackList.start();
        }
        try {
            const { data } = await axios.request(config);

            if (data.status === true) {
                if (typeof callbackList.success === 'function') {
                    callbackList.success();
                }

                if (noty && data.noty) {
                    notyService.show({
                        type: NotyTypeEnum.success,
                        text: data.noty,
                    });
                }
            } else {
                if (typeof callbackList.finish === 'function') {
                    callbackList.finish();
                }

                if (noty && data.noty) {
                    notyService.show({
                        type: NotyTypeEnum.error,
                        text: data.noty,
                    });
                }
            }

            return { result: true, data: data };
        } catch (error: any) {
            if (typeof callbackList.error === 'function') {
                callbackList.error();
            }

            if (error.response.status === 422) {
                validateErrorCallback()
                error.response.data.errors
            }

            if (axios.isAxiosError(error)) {
                console.log('AxiosService:: error message: ', error.message);

                return { result: false, data: error.message };
            } else {
                console.log('AxiosService:: unexpected error: ', error);

                return { result: false, data: null };
            }
        }
    }
}