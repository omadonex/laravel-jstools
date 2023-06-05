import { ValidateError } from '../ValidateError';
import { AnyObjInterface } from '../../../interfaces/AnyObjInterface';

export type RuleCheckerInterface = (ruleList: string, data: AnyObjInterface, field: string, paramList?: any) => ValidateError | true;
