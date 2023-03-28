import * as $ from 'jquery';

import { FormValidateServiceContract } from './contracts/FormValidateServiceContract';
import { ValidateService } from '../ValidateService/ValidateService';
import { ValidateErrorListInterface } from '../ValidateService/interfaces/ValidateErrorListInterface';
import { RuleListInterface } from '../ValidateService/interfaces/RuleListInterface';
import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { isEmpty } from '../../scripts/helpers';
import { Form } from '../../entities/Form/Form';
import { ComponentContract } from '../../components/contracts/ComponentContract';

export class JQueryFormValidateService extends ValidateService implements FormValidateServiceContract {
  validateForm(form: Form): ValidateErrorListInterface | true {
    const $form = $(`#${form.getId()}`);
    const data: AnyObjInterface = {};
    const ruleList: RuleListInterface = form.getRuleList();
    const ruleListForm: RuleListInterface = {};
    $form
      .find('input[data-jst-field],select[data-jst-field],div[data-jst-field][data-jst-component]')
      .each((index, element) => {
        const $input: any = $(element);
        const field: string = $input.data('jstField');
        if ($input.data('jstComponent') === 'jstree') {
          data[field] = (form.getComponent($input.attr('id')) as ComponentContract).getValue();
        } else {
          data[field] = $input.val();
        }

        if ($input.data('jstValidate')) {
          ruleListForm[field] = $input.data('jstValidate');
        }
      });

    return this.validate(data, isEmpty(ruleList) ? ruleListForm : ruleList);
  }
}
