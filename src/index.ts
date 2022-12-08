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
import {FormValidateServiceContract} from "./services/FormValidateService/contracts/FormValidateServiceContract";
import {TranslateServiceContract} from "./services/TranslateService/contracts/TranslateServiceContract";
import {ValidateServiceContract} from "./services/ValidateService/contracts/ValidateServiceContract";
export {
    FormContract,
    FormValidateServiceContract,
    TranslateServiceContract,
    ValidateServiceContract,
};

// ---Entities---
import {Form} from "./entities/Form/Form";
export {
    Form,
};

// ---Types---
import {FormTypeEnum} from "./entities/Form/FormTypeEnum";
export {
    FormTypeEnum,
};

