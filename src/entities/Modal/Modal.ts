import { Service } from 'laravel-jstools-di';

import { ModalContract } from './contracts/ModalContract';
import { ModalDataInterface } from './interfaces/ModalDataInterface';
import { ModalUsageEnum } from './ModalUsageEnum';
import { FormContract } from '../Form/contracts/FormContract';
import { JSToolsAbstractMap } from '../../app/JSToolsAbstractMap';
import { AxiosServiceContract } from '../../services/AxiosService/contracts/AxiosServiceContract';
import { CallbackListInterface } from '../../services/AxiosService/interfaces/CallbackListInterface';
import { ContextTypeEnum } from '../../types/ContextTypeEnum';
import { RequestDataInterface } from '../../interfaces/RequestDataInterface';

export abstract class Modal extends Service implements ModalContract {
  protected serviceDependsList: string[] = [
    JSToolsAbstractMap.AxiosServiceContract,
    JSToolsAbstractMap.NotyServiceContract,
  ];
  protected modalId: string;
  protected modalData: ModalDataInterface;
  protected modalUsage: ModalUsageEnum;
  protected showNoty: boolean;
  protected form: FormContract | null;
  protected extraSpinners: any = null;

  constructor(modalId: string, modalUsage: ModalUsageEnum, modalData: ModalDataInterface, showNoty: boolean) {
    super();
    this.modalId = modalId;
    this.modalData = modalData;
    this.modalUsage = modalUsage;
    this.showNoty = showNoty;
    this.form = null;
  }

  protected hasPreload(): boolean {
    return !!this.modalData.preloadData;
  }

  private reset(): void {
    this.modalOverlayHide();
    this.modalSubmitSpinnerHide();
    this.modalExtraSpinnerHide();
    this.modalClearAlerts();
    this.modalButtonsEnable();

    switch (this.modalUsage) {
      case ModalUsageEnum.info:
        this.modalSubmitHide();
        break;
      case ModalUsageEnum.confirm:
        this.modalSubmitShow();
        break;
      case ModalUsageEnum.form:
        this.modalSubmitShow();
        break;
    }
  }

  public getModalData(): ModalDataInterface {
    return this.modalData;
  }

  public showOverlay(): void {
    this.modalOverlayShow();
  }

  public hideOverlay(): void {
    this.modalOverlayHide();
  }

  public showSubmitSpinner(): void {
    this.modalSubmitSpinnerShow();
  }

  public hideSubmitSpinner(): void {
    this.modalSubmitSpinnerHide();
  }

  public showLoadingSpinner(): void {
    this.modalLoadingSpinnerShow();
  }

  public hideLoadingSpinner(): void {
    this.modalLoadingSpinnerHide();
  }

  public showExtraSpinners(): void {
    this.modalExtraSpinnerShow();
  }

  public hideExtraSpinners(): void {
    this.modalExtraSpinnerHide();
  }

  public enableButtons(): void {
    this.modalButtonsEnable();
  }

  public disableButtons(): void {
    this.modalButtonsDisable();
  }

  public show(): void {
    this.prepareElements();
    this.reset();
    this.modalShow();
    if (this.hasPreload()) {
      if (typeof this.modalData.preloadData !== 'undefined') {
        this.send(this.modalData.preloadData, false, {
          start: () => {
            this.modalSubmitSpinnerShow();
            this.modalExtraSpinnerShow();
            this.modalButtonsDisable();
            this.modalOverlayShow();
            this.modalClearAlerts();
          },
          finish: () => {
            this.modalSubmitSpinnerHide();
            this.modalExtraSpinnerHide();
            this.modalButtonsEnable();
            this.modalOverlayHide();
          },
          success: (data: any) => {
            this.form?.setInitData(data);
          },
        });
      }
    } else if (typeof this.modalData.initDataCallback !== 'undefined') {
      this.form?.setInitData(this.modalData.initDataCallback());
    }
  }

  public setExtraSpinners(spinnerList: any): void {
    this.extraSpinners = spinnerList;
  }

  private send(data: RequestDataInterface, showNoty: boolean, callbackList: CallbackListInterface): void {
    const axiosService: AxiosServiceContract = this.getService(JSToolsAbstractMap.AxiosServiceContract);
    const send = axiosService.send(
      Object.assign(data, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }),
      callbackList,
      showNoty,
    );

    send.then((res: any) => {
      if (res.result && !res.data.status) {
        this.modalShowAlerts(res.data.errors, ContextTypeEnum.danger);
        return;
      }

      if (!res.result && typeof res.data.status === 'undefined') {
        this.modalShowAlerts([res.data], ContextTypeEnum.warning);
      }
    });
  }

  public hide(): void {
    this.modalHide();
  }

  protected onHiddenCallback(): void {
    this.form?.clear();
  }

  public submit(): void {
    switch (this.modalUsage) {
      case ModalUsageEnum.info:
        break;
      case ModalUsageEnum.confirm:
        if (typeof this.modalData.submitData !== 'undefined') {
          this.send(this.modalData.submitData, this.showNoty, {
            start: () => {
              this.modalSubmitSpinnerShow();
              this.modalExtraSpinnerShow();
              this.modalButtonsDisable();
              this.modalOverlayShow();
              this.modalClearAlerts();
            },
            finish: () => {
              this.modalSubmitSpinnerHide();
              this.modalExtraSpinnerHide();
              this.modalButtonsEnable();
              this.modalOverlayHide();
            },
            success: (data: any) => {
              this.modalHide();
              this.callSubmitCallback();
            },
          });

          return;
        }

        this.modalHide();
        this.callSubmitCallback();

        break;
      case ModalUsageEnum.form:
        this.form?.submit();

        break;
    }
  }

  public callSubmitCallback(): void {
    if (typeof this.modalData.submitCallback !== 'undefined') {
      this.modalData.submitCallback();
    }
  }

  public setForm(form: FormContract | null) {
    if (form !== null) {
      form.attachToModal(this);
    }
    this.form = form;
  }

  private prepareElements(): void {
    if (this.modalData.title) {
      this.modalSetTitle(this.modalData.title);
    }

    if (this.modalData.submitText) {
      this.modalSetSubmitText(this.modalData.submitText);
    }

    if (this.modalData.cancelText) {
      this.modalSetCancelText(this.modalData.cancelText);
    }

    if (this.modalData.bodyCaption) {
      this.modalSetBodyCaption(this.modalData.bodyCaption);
    }

    if (this.modalData.bodyText) {
      this.modalSetBodyText(this.modalData.bodyText);
    }
  }

  protected abstract modalShow(): void;
  protected abstract modalHide(): void;
  protected abstract modalShowAlerts(alertList: string[], contextType: ContextTypeEnum): void;
  protected abstract modalClearAlerts(): void;
  protected abstract modalOverlayShow(): void;
  protected abstract modalOverlayHide(): void;
  protected abstract modalSubmitShow(): void;
  protected abstract modalSubmitHide(): void;
  protected abstract modalSubmitSpinnerShow(): void;
  protected abstract modalSubmitSpinnerHide(): void;
  protected abstract modalLoadingSpinnerShow(): void;
  protected abstract modalLoadingSpinnerHide(): void;
  protected abstract modalExtraSpinnerShow(): void;
  protected abstract modalExtraSpinnerHide(): void;
  protected abstract modalButtonsEnable(): void;
  protected abstract modalButtonsDisable(): void;
  protected abstract modalSetTitle(text: string): void;
  protected abstract modalSetSubmitText(text: string): void;
  protected abstract modalSetCancelText(text: string): void;
  protected abstract modalSetBodyCaption(text: string): void;
  protected abstract modalSetBodyText(text: string): void;
}
