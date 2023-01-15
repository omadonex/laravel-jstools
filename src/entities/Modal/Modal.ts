import {ModalContract} from "./contracts/ModalContract";
import {ModalDataInterface} from "./interfaces/ModalDataInterface";
import {ModalUsageEnum} from "./ModalUsageEnum";
import {FormContract} from "../Form/contracts/FormContract";
import {JSToolsAbstractMap} from "../../app/JSToolsAbstractMap";
import {AxiosServiceContract} from "../../services/AxiosService/contracts/AxiosServiceContract";
import {CallbackListInterface} from "../../services/AxiosService/interfaces/CallbackListInterface";
import {Entity} from "../Entity";
import {ContextTypeEnum} from "../../types/ContextTypeEnum";

export abstract class Modal extends Entity implements ModalContract {
    protected serviceDependsList: string[] = [
        JSToolsAbstractMap.AxiosServiceContract,
        JSToolsAbstractMap.NotyServiceContract,
    ];
    protected modalId: string;
    protected modalData: ModalDataInterface;
    protected modalUsage: ModalUsageEnum;
    protected showNoty: boolean;
    protected form: FormContract | null;

    constructor(modalId: string, modalData: ModalDataInterface, modalUsage: ModalUsageEnum, showNoty: boolean) {
        super();
        this.modalId = modalId;
        this.modalData = modalData;
        this.modalUsage = modalUsage;
        this.showNoty = showNoty;
        this.form = null;
    }

    private load(): void {
        this.modalOverlayHide();
        this.modalSubmitSpinnerHide();
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
                this.form?.clear();
                this.modalSubmitShow();
                break;
        }
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

    public enableButtons(): void {
        this.modalButtonsEnable();
    }

    public disableButtons(): void {
        this.modalButtonsDisable();
    }

    public show(): void {
        this.prepareElements();
        this.load();
        this.modalShow();
    }

    public hide(): void {
        this.modalHide();
    }

    public submit(): void {
        switch (this.modalUsage) {
            case ModalUsageEnum.info:
                break;
            case ModalUsageEnum.confirm:
                if (typeof this.modalData.submitData !== 'undefined') {
                    let axiosService: AxiosServiceContract = this.getService(JSToolsAbstractMap.AxiosServiceContract);
                    let callbackList: CallbackListInterface = {
                        start: () => {
                            this.modalSubmitSpinnerShow();
                            this.modalButtonsDisable();
                            this.modalOverlayShow();
                            this.modalClearAlerts();
                        },
                        finish: () => {
                            this.modalSubmitSpinnerHide();
                            this.modalButtonsEnable();
                            this.modalOverlayHide();
                        },
                        success: () => {
                            this.modalHide();
                            if (typeof this.modalData.submitCallback !== 'undefined') {
                                this.modalData.submitCallback();
                            }
                        },
                    }

                    let send = axiosService.send(Object.assign(this.modalData.submitData, {
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                        }
                    }), callbackList, this.showNoty);

                    send.then((res: any) => {
                        if (res.result && !res.data.status) {
                            this.modalShowAlerts(res.data.errors, ContextTypeEnum.danger);
                            return;
                        }

                        if (!res.result && typeof res.data.status === 'undefined') {
                            this.modalShowAlerts([res.data], ContextTypeEnum.warning);
                        }
                    });

                    return;
                }

                if (typeof this.modalData.submitCallback !== 'undefined') {
                    this.modalHide();
                    this.modalData.submitCallback();
                }

                break;
            case ModalUsageEnum.form:
                this.form?.submit();

                break;
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
    protected abstract modalOverlayHide(): void
    protected abstract modalSubmitShow(): void;
    protected abstract modalSubmitHide(): void;
    protected abstract modalSubmitSpinnerShow(): void;
    protected abstract modalSubmitSpinnerHide(): void;
    protected abstract modalButtonsEnable(): void;
    protected abstract modalButtonsDisable(): void;
    protected abstract modalSetTitle(text: string): void;
    protected abstract modalSetSubmitText(text: string): void;
    protected abstract modalSetCancelText(text: string): void;
    protected abstract modalSetBodyCaption(text: string): void;
    protected abstract modalSetBodyText(text: string): void;
}
