export const Test = (str: string) => `Test ${str}`;

// ---Misc---
import {JSToolsAbstractMap} from "./app/JSToolsAbstractMap";
import {AppLocator} from "./app/AppLocator";
import {ServiceProvider} from "./di/ServiceProvider";
import {Service} from "./services/Service";
export {
    JSToolsAbstractMap,
    AppLocator,
    ServiceProvider,
    Service,
};

// ---Contracts
import {FormContract} from "./entities/Form/contracts/FormContract";
import {ModalContract} from "./entities/Modal/contracts/ModalContract";
import {AxiosServiceContract} from "./services/AxiosService/contracts/AxiosServiceContract";
import {FormValidateServiceContract} from "./services/FormValidateService/contracts/FormValidateServiceContract";
import {NotyServiceContract} from "./services/NotyService/contracts/NotyServiceContract";
import {TranslateServiceContract} from "./services/TranslateService/contracts/TranslateServiceContract";
import {ValidateServiceContract} from "./services/ValidateService/contracts/ValidateServiceContract";
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
import {Form} from "./entities/Form/Form";
import {Modal} from "./entities/Modal/Modal";
export {
    Form,
    Modal,
};

// ---Types---
import {EntityTypeEnum} from "./entities/EntityTypeEnum";
import {ModalUsageEnum} from "./entities/Modal/ModalUsageEnum";
import {NotyTypeEnum} from "./services/NotyService/NotyTypeEnum";
export {
    EntityTypeEnum,
    ModalUsageEnum,
    NotyTypeEnum,
};

// ---Interfaces---
import {ModalDataInterface} from "./entities/Modal/interfaces/ModalDataInterface";
import {ModalSubmitDataInterface} from "./entities/Modal/interfaces/ModalSubmitDataInterface";
export {
    ModalDataInterface,
    ModalSubmitDataInterface,
}

