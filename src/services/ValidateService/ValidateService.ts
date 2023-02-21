import { isEmpty, isNumeric } from '../../scripts/helpers';
import { ValidateServiceContract } from './contracts/ValidateServiceContract';
import { ValidateError } from './ValidateError';
import { RuleCheckerInterface } from './interfaces/RuleCheckerInterface';
import { ValidateErrorListInterface } from './interfaces/ValidateErrorListInterface';
import { Service } from '../Service';
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

        const validationResult = this.check(data, field, rule, paramList);
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

  private check(data: AnyObjInterface, field: string, rule: string, paramList: any): ValidateError | true {
    return this.getRuleChecker(rule)(data, field, paramList);
  }

  private getRuleChecker(rule: string): RuleCheckerInterface {
    switch (rule) {
      case 'confirmed':
        return this.checkConfirmed;
      case 'email':
        return this.checkEmail;
      case 'max':
        return this.checkMax;
      case 'min':
        return this.checkMin;
      case 'required':
        return this.checkRequired;
      case 'notIn' :
        return this.checkNotIn;
    }

    return this.fakeCheck;
  }

  private fakeCheck(data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    return true;
  }

  private checkConfirmed(data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];
    const valueConfirmation: any = data[`${field}_confirmation`];

    return (value && value === valueConfirmation) || new ValidateError(field, 'confirmed');
  }

  private checkEmail(data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];

    return (value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) || new ValidateError(field, 'email');
  }

  private checkMax(data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];
    const type = isNumeric(value) ? 'numeric' : 'string'; // TODO omadonex: file, array

    return (value && value.length <= paramList) || new ValidateError(field, `max.${type}`, { max: paramList });
  }

  private checkMin(data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];
    const type = isNumeric(value) ? 'numeric' : 'string'; // TODO omadonex: file, array

    return (value && value.length >= paramList) || new ValidateError(field, `min.${type}`, { min: paramList });
  }

  private checkRequired(data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];

    return !!value || new ValidateError(field, 'required');
  }

  private checkNotIn(data: AnyObjInterface, field: string, paramList?: any): ValidateError | true {
    const value: any = data[field];
    const valueForCheck: any = data[paramList];

    return (value && value !== valueForCheck) || new ValidateError(field, 'not_in');
  }
}
