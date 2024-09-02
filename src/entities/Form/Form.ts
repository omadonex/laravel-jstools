import { Service } from 'laravel-jstools-di';

import { FormContract } from './contracts/FormContract';
import { FormValidateServiceContract } from '../../services/FormValidateService/contracts/FormValidateServiceContract';
import { ValidateErrorListInterface } from '../../services/ValidateService/interfaces/ValidateErrorListInterface';
import { AnyObjInterface } from '../../interfaces/AnyObjInterface';
import { ModalContract } from '../Modal/contracts/ModalContract';
import { AxiosServiceContract } from '../../services/AxiosService/contracts/AxiosServiceContract';
import { JSToolsAbstractMap } from '../../app/JSToolsAbstractMap';
import { CallbackListInterface } from '../../services/AxiosService/interfaces/CallbackListInterface';
import { ValidateError } from '../../services/ValidateService/ValidateError';
import { ContextTypeEnum } from '../../types/ContextTypeEnum';
import { FormDataInterface } from './interfaces/FormDataInterface';
import { RuleListInterface } from '../../services/ValidateService/interfaces/RuleListInterface';

/*TODO omadonex:
  1. Из общих кейсов. Web форма внутри модалки после сабмита и получения ошибок валидации отрабатывает некорректно
     Необходимо переоткрыть форму с алертом
*/

export abstract class Form extends Service implements FormContract {
  protected serviceDependsList: string[] = [
    JSToolsAbstractMap.TranslateServiceContract,
    JSToolsAbstractMap.AxiosServiceContract,
  ];
  private modal: ModalContract | null = null;
  protected validateService: FormValidateServiceContract;
  protected formId: string;
  protected formData: FormDataInterface;
  protected showNoty: boolean;
  protected componentsOptions: AnyObjInterface;
  protected components: AnyObjInterface;
  protected ruleList: RuleListInterface = {};
  protected isSending: boolean;
  protected defaultValues: AnyObjInterface = {};
  protected defaultAction: string = '';
  protected defaultMethod: string = '';
  protected submitCallback: any = null;
  protected preSubmitCallback: any = null;
  protected afterSubmitCallback: any = null;
  protected extraSpinners: any[] = [];

  constructor(
    formId: string,
    formData: FormDataInterface,
    showNoty: boolean,
    componentsOptions: AnyObjInterface,
    validateService: FormValidateServiceContract,
  ) {
    super();
    this.formId = formId;
    this.formData = formData;
    this.showNoty = showNoty;
    this.componentsOptions = componentsOptions;
    this.components = {};
    this.isSending = false;
    this.validateService = validateService;
  }

  protected isAjax(): boolean {
    return this.formData.ajax || false;
  }

  protected isNoSubmitBtn(): boolean {
    return this.formData.noBtn || false;
  }

  protected isSubmitOnEnter(): boolean {
    if (this.formData.submitOnEnter !== undefined) {
      return this.formData.submitOnEnter;
    }

    return true;
  }

  protected saveDefaultValues(): void {
    this.defaultValues = this.serialize();
    this.defaultAction = this.getAction();
    this.defaultMethod = this.getMethod();
  }

  protected abstract disableSubmitOnEnter(): void;
  protected abstract enableSubmitOnEnter(): void;
  protected abstract showErrors(errorList: ValidateErrorListInterface): void;
  protected abstract clearErrors(): void;
  protected abstract showAlerts(alertList: string[], contextType: ContextTypeEnum): void;
  protected abstract clearAlerts(): void;
  protected abstract clearInputs(): void;
  protected abstract callFormSubmit(): void;
  protected abstract showSubmitBtn(): void;
  protected abstract hideSubmitBtn(): void;
  protected abstract disableSubmitBtn(): void;
  protected abstract enableSubmitBtn(): void;
  protected abstract disableFieldsInput(): void;
  protected abstract enableFieldsInput(): void;
  protected abstract showSpinner(): void;
  protected abstract hideSpinner(): void;
  public abstract serialize(): AnyObjInterface;

  public abstract setSubmitButton(button: any): void;
  public abstract setInitData(data: AnyObjInterface): void;
  public abstract setAction(action: string): void;
  public abstract setMethod(method: string): void;
  public abstract getMethod(): string;
  public abstract getAction(): string;
  public abstract getToken(): string;

  public setSubmitCallback(callback: any): void {
    this.submitCallback = callback;
  }

  public setPreSubmitCallback(callback: any): void {
    this.preSubmitCallback = callback;
  }

  public setAfterSubmitCallback(callback: any): void {
    this.afterSubmitCallback = callback;
  }

  public setExtraSpinners(spinnerList: any[]): void {
    this.extraSpinners = spinnerList;
  }

  public clear(): void {
    this.clearErrors();
    this.clearInputs();
    this.clearAlerts();
    this.setMethod(this.defaultMethod);
    this.setAction(this.defaultAction);
  }

  public attachToModal(modal: ModalContract) {
    this.modal = modal;
  }

  private preSubmitActions(): void {
    if (this.modal === null) {
      this.showSpinner();
      this.disableSubmitBtn();
      this.disableFieldsInput();
      if (this.preSubmitCallback) {
        this.preSubmitCallback();
      }
    } else {
      this.modal.showSubmitSpinner();
      this.modal.disableButtons();
      this.modal.showOverlay();
    }
  }

  private afterSubmitActions(): void {
    if (this.modal === null) {
      this.hideSpinner();
      this.enableSubmitBtn();
      this.enableFieldsInput();
      if (this.afterSubmitCallback) {
        this.afterSubmitCallback();
      }
    } else {
      this.modal.hideSubmitSpinner();
      this.modal.enableButtons();
      this.modal.hideOverlay();
    }
  }

  public submit(): void {
    this.clearErrors();
    this.clearAlerts();
    const errorList = this.validate();
    if (errorList !== true) {
      this.showErrors(errorList);
    } else {
      if (!this.isAjax()) {
        this.preSubmitActions();
        this.callFormSubmit();
      } else {
        this.doSubmit();
      }
    }
  }

  public validate(): ValidateErrorListInterface | true {
    return this.validateService.validateForm(this);
  }

  private doSubmit(): void {
    const axiosService: AxiosServiceContract = this.getService(JSToolsAbstractMap.AxiosServiceContract);
    const callbackList: CallbackListInterface = {
      start: () => {
        this.isSending = true;
        this.preSubmitActions();
      },
      finish: () => {
        this.isSending = false;
        this.afterSubmitActions();
      },
      success: (data: any) => {
        if (this.modal === null) {
          this.callSubmitCallback();
        } else {
          this.modal.hide();
          this.modal.callSubmitCallback();
        }
        this.clear();
      },
      error: (errors: any) => {
        const errorList: ValidateErrorListInterface = {};
        const alertList: string[] = [];
        for (const field of Object.keys(errors)) {
          errorList[field] = {
            rule: new ValidateError(field, 'rule', [], errors[field][0]),
          };
          alertList.push(errors[field][0]);
        }
        this.showErrors(errorList);
        this.showAlerts(alertList, ContextTypeEnum.danger);
      },
    };

    const send = axiosService.send(
      {
        url: this.getAction(),
        method: this.getMethod(),
        data: this.serialize(),
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
      callbackList,
      this.showNoty,
    );

    send.then((res: any) => {
      if (res.result && !res.data.status) {
        this.showAlerts(res.data.errors, ContextTypeEnum.danger);
        return;
      }

      if (!res.result && typeof res.data.status === 'undefined') {
        this.showAlerts([res.data], ContextTypeEnum.warning);
      }
    });
  }

  public setRuleList(ruleList: RuleListInterface): void {
    this.ruleList = ruleList;
  }

  public callSubmitCallback(): void {
    if (this.submitCallback) {
      this.submitCallback();

      return;
    }

    if (typeof this.formData.submitCallback !== 'undefined') {
      this.formData.submitCallback();
    }
  }

  public getId(): string {
    return this.formId;
  }

  public getRuleList(): RuleListInterface {
    return this.ruleList;
  }

  public getComponent(type: string): any {
    return this.components[type];
  }
}
