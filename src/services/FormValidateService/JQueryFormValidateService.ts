import * as $ from 'jquery';

import { FormValidateServiceContract } from './contracts/FormValidateServiceContract';
import { ValidateService } from '../ValidateService/ValidateService';
import { ValidateErrorListInterface } from '../ValidateService/interfaces/ValidateErrorListInterface';
import { RuleListInterface } from '../ValidateService/interfaces/RuleListInterface';
import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { isEmpty } from '../../scripts/helpers';

export class JQueryFormValidateService extends ValidateService implements FormValidateServiceContract {
  validateForm(formId: string, ruleList: RuleListInterface = {}): ValidateErrorListInterface | true {
    const $form = $(`#${formId}`);
    const data: AnyObjInterface = {};
    const ruleListForm: RuleListInterface = {};
    $form.find('input[data-jst-field],select[data-jst-field]').each((index, element) => {
      const $input = $(element);
      const field: string = $input.data('jstField');
      data[field] = $input.val();

      if ($input.data('jstValidate')) {
        ruleListForm[field] = $input.data('jstValidate');
      }
    });

    return this.validate(data, isEmpty(ruleList) ? ruleListForm : ruleList);
  }
}
