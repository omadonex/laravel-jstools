export const Test = (str: string) => `Test ${str}`;

// ---Misc---
import { JSToolsAbstractMap } from './app/JSToolsAbstractMap';
import { App } from './app/App';
export { JSToolsAbstractMap, App };

// ---Contracts
import { FormContract } from './entities/Form/contracts/FormContract';
import { ModalContract } from './entities/Modal/contracts/ModalContract';
import { AxiosServiceContract } from './services/AxiosService/contracts/AxiosServiceContract';
import { FormValidateServiceContract } from './services/FormValidateService/contracts/FormValidateServiceContract';
import { NotyServiceContract } from './services/NotyService/contracts/NotyServiceContract';
import { TranslateServiceContract } from './services/TranslateService/contracts/TranslateServiceContract';
import { ValidateServiceContract } from './services/ValidateService/contracts/ValidateServiceContract';
export {
  FormContract,
  ModalContract,
  AxiosServiceContract,
  FormValidateServiceContract,
  NotyServiceContract,
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
import { Quill } from "./components/editor/Quill";

export { JsTree, Quill };
