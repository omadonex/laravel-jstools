import { AppLocator } from 'laravel-jstools-di';

import { AppServiceProvider } from './providers/AppServiceProvider';
import { JSToolsAbstractMap } from './JSToolsAbstractMap';

import { FormContract } from '../entities/Form/contracts/FormContract';
import { ModalContract } from '../entities/Modal/contracts/ModalContract';
import { ModalDataInterface } from '../entities/Modal/interfaces/ModalDataInterface';
import { ModalUsageEnum } from '../entities/Modal/ModalUsageEnum';
import { EntityTypeEnum } from '../entities/EntityTypeEnum';
import { NotyDataInterface } from '../services/NotyService/interfaces/NotyDataInterface';
import { NotyServiceContract } from '../services/NotyService/contracts/NotyServiceContract';
import { FormDataInterface } from '../entities/Form/interfaces/FormDataInterface';
import { AnyObjInterface } from '../interfaces/AnyObjInterface';

export class App extends AppLocator {
  constructor(globalData: any) {
    super(globalData);
    this.registerProvider(new AppServiceProvider());
  }

  public makeEntity(name: string, entityType: EntityTypeEnum, params: any = {}): any {
    return this.make(name, Object.assign(params, { entityType }));
  }

  public form(
    formId: string,
    formData: FormDataInterface,
    showNoty: boolean,
    componentsOptions: AnyObjInterface,
    entityType: EntityTypeEnum,
  ): FormContract {
    return this.makeEntity(JSToolsAbstractMap.FormContract, entityType, {
      formId,
      formData,
      showNoty,
      componentsOptions,
    });
  }

  public modal(
    modalId: string,
    modalUsage: ModalUsageEnum,
    modalData: ModalDataInterface,
    showNoty: boolean,
    tools: any,
    entityType: EntityTypeEnum,
  ): ModalContract {
    return this.makeEntity(JSToolsAbstractMap.ModalContract, entityType, {
      modalId,
      modalUsage,
      modalData,
      showNoty,
      tools,
    });
  }

  public noty(data: NotyDataInterface): void {
    (this.make(JSToolsAbstractMap.NotyServiceContract) as NotyServiceContract).show(data);
  }
}
