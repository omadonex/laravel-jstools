export const Test = (str: string) => `Test ${str}`;

// ---Misc---
import { JSToolsAbstractMap } from './app/JSToolsAbstractMap';
import { App } from './app/App';
import { Page } from './services/PageService/Page';

export { JSToolsAbstractMap, App, Page };

// ---Contracts
import { FormContract } from './entities/Form/contracts/FormContract';
import { ModalContract } from './entities/Modal/contracts/ModalContract';
import { AxiosServiceContract } from './services/AxiosService/contracts/AxiosServiceContract';
import { FormValidateServiceContract } from './services/FormValidateService/contracts/FormValidateServiceContract';
import { NotyServiceContract } from './services/NotyService/contracts/NotyServiceContract';
import { PageServiceContract } from './services/PageService/contracts/PageServiceContract';
import { TranslateServiceContract } from './services/TranslateService/contracts/TranslateServiceContract';
import { ValidateServiceContract } from './services/ValidateService/contracts/ValidateServiceContract';
export {
  FormContract,
  ModalContract,
  AxiosServiceContract,
  FormValidateServiceContract,
  NotyServiceContract,
  PageServiceContract,
  TranslateServiceContract,
  ValidateServiceContract,
};

// ---Entities---
import { Form } from './entities/Form/Form';
import { Modal } from './entities/Modal/Modal';
export { Form, Modal };

// ---Types---
import { ContextTypeEnum } from './types/ContextTypeEnum';
import { EntityTypeEnum } from './entities/EntityTypeEnum';
import { ModalUsageEnum } from './entities/Modal/ModalUsageEnum';
export { ContextTypeEnum, EntityTypeEnum, ModalUsageEnum };

// ---Interfaces---
import { FormDataInterface } from './entities/Form/interfaces/FormDataInterface';
import { ModalDataInterface } from './entities/Modal/interfaces/ModalDataInterface';
import { NotyDataInterface } from './services/NotyService/interfaces/NotyDataInterface';
import { RequestDataInterface } from './interfaces/RequestDataInterface';
export { FormDataInterface, ModalDataInterface, NotyDataInterface, RequestDataInterface };

// ---Components---
import { JsTree } from './components/tree/JsTree';
import { QuillEditor } from './components/editor/QuillEditor';

export { JsTree, QuillEditor };
