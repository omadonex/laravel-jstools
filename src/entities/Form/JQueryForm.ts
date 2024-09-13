import * as $ from 'jquery';
import { Form } from './Form';
import { ValidateError } from '../../services/ValidateService/ValidateError';
import { TranslateServiceContract } from '../../services/TranslateService/contracts/TranslateServiceContract';
import { ValidateErrorListInterface } from '../../services/ValidateService/interfaces/ValidateErrorListInterface';
import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { JSToolsAbstractMap } from '../../app/JSToolsAbstractMap';
import { JQueryFormValidateService } from '../../services/FormValidateService/JQueryFormValidateService';
import { ContextTypeEnum } from '../../types/ContextTypeEnum';
import { FormDataInterface } from './interfaces/FormDataInterface';
import { JsTree } from '../../components/tree/JsTree';
import { QuillEditor } from '../../components/editor/QuillEditor';
import { FlatPickr } from '../../components/datepicker/FlatPickr';

export class JQueryForm extends Form {
  private $form: any;
  private $fieldList: any;
  private $spinner: any;
  private $submit: any;
  private $alert: any;

  constructor(formId: string, formData: FormDataInterface, showNoty: boolean, componentsOptions: AnyObjInterface) {
    super(formId, formData, showNoty, componentsOptions, new JQueryFormValidateService());
    this.$form = $(`#${this.formId}`);
    this.$fieldList = this.$form.find(
      'input[data-jst-field],textarea[data-jst-field],select[data-jst-field],div[data-jst-field][data-jst-component]',
    );
    this.$spinner = this.$form.find('span[data-jst-spinner]');
    this.$submit = this.$form.find('button[data-jst-submit]');
    this.$alert = this.$form.find('div[data-jst-alert]');

    this.initComponents();

    if (this.isNoSubmitBtn()) {
      this.hideSubmitBtn();
    } else {
      this.setSubmitButton(this.$submit);
    }

    if (this.isSubmitOnEnter()) {
      this.enableSubmitOnEnter();
    } else {
      this.disableSubmitOnEnter();
    }

    this.saveDefaultValues();
  }

  protected disableSubmitOnEnter(): void {
    this.$form.on('keydown', (e: any): void => {
      if (e.code === 'Enter') {
        e.preventDefault();
      }
    });
  }

  // TODO omadonex: добавить возможность обычным textarea нажимать enter но не отправлять форму
  public enableSubmitOnEnter(): void {
    this.$form.on('keydown', (e: any): void => {
      if (e.code === 'Enter') {
        e.preventDefault();
        this.submit();
      }
    });
  }

  protected initComponents(): void {
    this.$fieldList.each((index: number, element: any) => {
      const $field: any = $(element);
      if ($field.data('jstComponent') === 'jstree') {
        this.components[$field.attr('id')] = new JsTree($field.attr('id'), this.componentsOptions.jstree);
      }
      if ($field.data('jstComponent') === 'quill') {
        this.components[$field.attr('id')] = new QuillEditor($field.attr('id'), this.componentsOptions.quill);
      }
      if ($field.data('jstComponent') === 'flatpickr') {
        this.components[$field.attr('id')] = new FlatPickr($field.attr('id'), this.componentsOptions.flatpickr);
      }
    });
  }

  protected setComponentValue($input: any, inputData: AnyObjInterface, fieldName: string): void {
    if ($input.data('jstComponent') === 'jstree') {
      const jstree: JsTree = this.components[$input.attr('id')];
      if (inputData[`${fieldName}__tree`]) {
        jstree.setData(inputData[`${fieldName}__tree`], inputData[fieldName]);
        return;
      }

      jstree.select(inputData[fieldName]);
    }

    if ($input.data('jstComponent') === 'quill') {
      // TODO omadonex: continue work
      const quill: QuillEditor = this.components[$input.attr('id')];
      console.log(inputData);
      quill.setValue('dd');
    }

    if ($input.data('jstComponent') === 'flatpickr') {
      const flatpickr: FlatPickr = this.components[$input.attr('id')];
      flatpickr.setValue(inputData[fieldName]);
    }
  }

  protected getComponentValue($input: any): null | string {
    if ($input.data('jstComponent')) {
      return this.components[$input.attr('id')].getValue();
    }

    return null;
  }

  protected showErrors(errorList: ValidateErrorListInterface): void {
    const translateService: TranslateServiceContract = this.getService(JSToolsAbstractMap.TranslateServiceContract);
    this.clearErrors();

    this.$fieldList.each((index: number, element: any) => {
      const $input: any = $(element);
      const field = $input.data('jstField');
      if (!$input.data('jstNoValidate')) {
        if (field in errorList) {
          const $divError = this.$form.find(`.invalid-feedback[data-jst-field="${field}"]`);
          const error: ValidateError = Object.values(errorList[field])[0];
          $divError.text(error.toText(translateService));
          $input.addClass('is-invalid');

          // Dashly Tom-Select
          const $next = $input.next();
          if ($next && $next.hasClass('ts-wrapper') && $next.hasClass('form-select')) {
            $next.addClass('is-invalid');
          }
        } else {
          $input.addClass('is-valid');
        }
      }
    });
  }

  protected clearErrors(): void {
    this.$fieldList.removeClass('is-valid is-invalid');
  }

  protected showAlerts(alertList: string[], contextType: ContextTypeEnum): void {
    if (this.$alert) {
      const classList: string[] = [];
      Object.keys(ContextTypeEnum).forEach((key) => {
        classList.push(`alert-${key}`);
      });

      let html: string = '';
      html += '<ul>';
      alertList.forEach((alert: string) => {
        html += `<li>${alert}</li>`;
      });
      html += '</ul>';

      this.$alert.html(html);
      this.$alert.removeClass(classList).addClass(`alert-${contextType}`);
      this.$alert.removeClass('d-none');
    }
  }

  protected clearAlerts(): void {
    if (this.$alert) {
      this.$alert.innerHTML = '';
      this.$alert.addClass('d-none');
    }
  }

  protected setInputsValues(data: AnyObjInterface): void {
    for (const name of Object.keys(data)) {
      const $input: any = this.$form.find(
        `input[data-jst-field="${name}"],textarea[data-jst-field="${name}"],select[data-jst-field="${name}"],div[data-jst-field="${name}"][data-jst-component]`,
      );
      if ($input.is('select')) {
        const el: any = $input[0];
        if (el.tomselect) {
          el.tomselect.setValue(data[name]);
        } else {
          $input.val(data[name]).change();
        }
      } else if ($input.is('textarea')) {
        $input.val(data[name]);
      } else if ($input.is('div')) {
        this.setComponentValue($input, data, name);
      } else {
        switch ($input.attr('type')) {
          case 'text':
          case 'password':
            $input.val(data[name]);
            break;
          case 'checkbox':
            $input.prop('checked', data[name] === 'on');
            break;
          case 'radio':
            $input.filter(`[value=${data[name]}]`).prop('checked', true);
            break;
        }
      }
    }
  }

  public setMethod(method: string): void {
    // TODO omadonex: установить значение инпута
    this.$form.attr('method', method);
  }

  public setAction(action: string): void {
    this.$form.attr('action', action);
  }

  public getMethod(): string {
    const $method = this.$form.find('input[name=_method]');
    if ($method.length) {
      return $method.val();
    }

    return this.$form.attr('method');
  }

  public getAction(): string {
    return this.$form.attr('action');
  }

  public getToken(): string {
    return this.$form.find('input[name=_token]').val();
  }

  public hide(): void {
    this.$form.addClass('d-none');
  }

  public show(): void {
    this.$form.removeClass('d-none');
  }

  protected callFormSubmit(): void {
    const form: HTMLFormElement = document.getElementById(this.formId) as HTMLFormElement;
    form.addEventListener('formdata', (e) => {
      const formData = e.formData;
      const data = this.serialize();
      for (const field of Object.keys(data)) {
        formData.set(field, data[field]);
      }
      formData.set('_formid', this.formId);
    });
    form.submit();
  }

  protected showSubmitBtn(): void {
    this.$submit.show();
  }

  protected hideSubmitBtn(): void {
    this.$submit.hide();
  }

  protected disableSubmitBtn(): void {
    this.$submit.attr('disabled', 'disabled');
  }

  protected enableSubmitBtn(): void {
    this.$submit.prop('disabled', false);
  }

  protected showSpinner(): void {
    this.$spinner.removeClass('d-none');
    if (this.extraSpinners) {
      this.extraSpinners.each((index: number, el: any): void => {
        $(el).removeClass('d-none');
      });
    }
  }

  protected hideSpinner(): void {
    this.$spinner.addClass('d-none');
    if (this.extraSpinners) {
      this.extraSpinners.each((index: number, el: any): void => {
        $(el).addClass('d-none');
      });
    }
  }

  protected disableFieldsInput(): void {
    this.$fieldList.attr('readonly', true);
  }

  protected enableFieldsInput(): void {
    this.$fieldList.attr('readonly', false);
  }

  public setSubmitButton(button: any): void {
    button.on('click', () => {
      this.submit();
    });
  }

  public serialize(): AnyObjInterface {
    const data: AnyObjInterface = {};
    this.$fieldList.each((index: number, input: any) => {
      const $input: any = $(input);
      const name: string = $input.data('jstField') as string;
      if ($input.is('select') || $input.is('textarea')) {
        data[name] = $input.val();
      } else if ($input.is('div')) {
        data[name] = this.getComponentValue($input);
      } else {
        switch ($input.attr('type')) {
          case 'text':
          case 'password':
          case 'hidden':
            data[name] = $input.val();
            break;
          case 'checkbox':
            data[name] = $input.prop('checked') ? 'on' : 'off';
            break;
          case 'radio':
            data[name] = $(`input[type="radio"][name="${name}"]:checked`).val();
            break;
        }
      }
    });

    return data;
  }
}
