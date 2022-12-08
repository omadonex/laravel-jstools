import { isNumeric } from '../../scripts/helpers';
import {ValidateServiceContract} from "./contracts/ValidateServiceContract";
import ValidateError from "./ValidateError";
import {RuleCheckerInterface} from "./interfaces/RuleCheckerInterface";
import {ValidateErrorListInterface} from "./interfaces/ValidateErrorListInterface";
import Service from "../Service";

export default class ValidateService extends Service implements ValidateServiceContract {
    public validate(value: string, ruleStr: string): ValidateErrorListInterface {
        let errorList: ValidateErrorListInterface = {};

        ruleStr.split('|').forEach((item, i, arr) => {
            let data = item.split(':');
            let rule = data[0];
            let paramList = data[1];

            let validationResult = this.check(value, rule, paramList);
            if (validationResult !== true) {
                errorList[rule] = validationResult;
            }
        });

        return errorList;
    }

    private check(value: string, rule: string, paramList: any): ValidateError | true {
        return this.getRuleChecker(rule)(value, paramList);
    }

    private getRuleChecker(rule: string): RuleCheckerInterface {
        switch (rule) {
            case 'min': return this.checkMin;
            case 'required': return this.checkRequired;
        }

        return this.fakeCheck;
    }

    private fakeCheck(value: string, paramList?: any): ValidateError | true {
        return true;
    }

    private checkMax(value: string, paramList?: any): ValidateError | true {
        let type = isNumeric(value) ? 'numeric' : 'string'; //TODO omadonex: file, array
        return (value && value.length <= paramList) || new ValidateError(`max.${type}`, { max: paramList });
    }

    private checkMin(value: string, paramList?: any): ValidateError | true {
        let type = isNumeric(value) ? 'numeric' : 'string'; //TODO omadonex: file, array
        return (value && value.length >= paramList) || new ValidateError(`min.${type}`, { min: paramList });
    }

    private checkRequired(value: string, paramList?: any): ValidateError | true {
        return !!value || new ValidateError('required');
    }
}