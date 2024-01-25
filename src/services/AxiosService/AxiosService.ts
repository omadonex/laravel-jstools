import axios from 'axios';
import { Service } from 'laravel-jstools-di';

import { AxiosServiceContract } from './contracts/AxiosServiceContract';
import { NotyServiceContract } from '../NotyService/contracts/NotyServiceContract';
import { CallbackListInterface } from './interfaces/CallbackListInterface';
import { JSToolsAbstractMap } from '../../app/JSToolsAbstractMap';
import { FormContract } from '../../entities/Form/contracts/FormContract';
import { ContextTypeEnum } from '../../types/ContextTypeEnum';

export class AxiosService extends Service implements AxiosServiceContract {
  protected serviceDependsList: string[] = [JSToolsAbstractMap.NotyServiceContract];

  public async send(config: any, callbackList: CallbackListInterface, showNoty: boolean = true, form?: FormContract) {
    const notyService: NotyServiceContract = this.getService(JSToolsAbstractMap.NotyServiceContract);

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
          callbackList.success(data.result);
        }

        if (showNoty && data.noty) {
          notyService.show({
            context: data.noty.context || ContextTypeEnum.success,
            message: data.noty.message,
          });
        }
      } else {
        if (showNoty && data.noty) {
          notyService.show({
            context: data.noty.context || ContextTypeEnum.danger,
            message: data.noty.message,
          });
        }
      }

      return { result: true, data };
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
