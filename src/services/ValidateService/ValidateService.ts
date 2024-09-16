import { Service } from 'laravel-jstools-di';

import { isEmpty, isNumeric } from '../../scripts/helpers';
import { ValidateServiceContract } from './contracts/ValidateServiceContract';
import { ValidateError } from './ValidateError';
import { RuleCheckerInterface } from './interfaces/RuleCheckerInterface';
import { ValidateErrorListInterface } from './interfaces/ValidateErrorListInterface';
import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { RuleListInterface } from './interfaces/RuleListInterface';

export class ValidateService extends Service implements ValidateServiceContract {
  public validate(data: AnyObjInterface, ruleList: RuleListInterface): ValidateErrorListInterface | true {
    const errorList: ValidateErrorListInterface = {};
    for (const field of Object.keys(ruleList)) {
      ruleList[field].split('|').forEach((item, i, arr) => {
        const ruleData = item.split(':');
        const rule = ruleData[0];
        const paramList = ruleData[1];

        const validationResult = this.check(ruleList[field], data, field, rule, paramList);
        if (validationResult !== true) {
          if (!errorList.hasOwnProperty(field)) {
            errorList[field] = {};
          }
          errorList[field][rule] = validationResult;
        }
      });
    }

    return isEmpty(errorList) ? true : errorList;
  }

  private check(
    ruleList: string,
    data: AnyObjInterface,
    field: string,
    rule: string,
    paramList: any,
  ): ValidateError | true {
    return this.getRuleChecker(rule)(ruleList, data, field, paramList);
  }

  private getRuleChecker(rule: string): RuleCheckerInterface {
    switch (rule) {
      case 'confirmed':
        return this.checkConfirmed;
      case 'email':
        return this.checkEmail;
      case 'integer':
        return this.checkInteger;
      case 'max':
        return this.checkMax;
      case 'min':
        return this.checkMin;
      case 'notIn':
        return this.checkNotIn;
      case 'nullable':
        return this.checkNullable;
      case 'numeric':
        return this.checkNumeric;
      case 'phone':
        return this.checkPhone;
      case 'required':
        return this.checkRequired;
    }

    return this.fakeCheck;
  }

  private fakeCheck(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    return true;
  }

  private checkConfirmed(
    ruleList: string,
    data: AnyObjInterface,
    field: string,
    paramList?: any,
  ): ValidateError | true {
    const value: any = data[field];
    const valueConfirmation: any = data[`${field}_confirmation`];

    return (value && value === valueConfirmation) || new ValidateError(field, 'confirmed');
  }

  private checkEmail(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];

    if (ruleList.split('|').includes('nullable') && !value) {
      return true;
    }

    return (value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) || new ValidateError(field, 'email');
  }

  private checkInteger(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];

    return (!!value && Number.isInteger(value)) || new ValidateError(field, 'integer');
  }

  private checkMax(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];
    const type = isNumeric(value) ? 'numeric' : 'string'; // TODO omadonex: file, array

    return (value && value.length <= paramList) || new ValidateError(field, `max.${type}`, { max: paramList });
  }

  private checkMin(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];
    const type = isNumeric(value) ? 'numeric' : 'string'; // TODO omadonex: file, array

    return (value && value.length >= paramList) || new ValidateError(field, `min.${type}`, { min: paramList });
  }

  private checkNotIn(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];
    const valueForCheck: any = data[paramList];

    return (value && value !== valueForCheck) || new ValidateError(field, 'not_in');
  }

  private checkNullable(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    return true;
  }

  private checkNumeric(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];

    return (!!value && isNumeric(value)) || new ValidateError(field, 'numeric');
  }

  private checkPhone(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];

    if (ruleList.split('|').includes('nullable') && !value) {
      return true;
    }

    return (value && /^[0-9]{10}$/.test(value)) || new ValidateError(field, 'phone');
  }

  private checkRequired(ruleList: string, data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];

    return !!value || new ValidateError(field, 'required');
  }
}
