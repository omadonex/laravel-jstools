export const Test = (str: string) => `Test ${str}`;

import {JSToolsAbstractMap} from "./app/JSToolsAbstractMap";
import AppLocator from "./app/AppLocator";
import ServiceProvider from "./di/ServiceProvider";

import {TranslateServiceContract} from "./services/contracts/TranslateServiceContract";
import {ValidateServiceContract} from "./services/contracts/ValidateServiceContract";

export { JSToolsAbstractMap, AppLocator, ServiceProvider };

export {
    TranslateServiceContract,
    ValidateServiceContract,
};