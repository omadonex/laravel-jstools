import {ModalContract} from "./contracts/ModalContract";
import {Modal} from "./Modal";
import {ModalDataInterface} from "./interfaces/ModalDataInterface";
import {ModalUsageEnum} from "./ModalUsageEnum";
import {ContextTypeEnum} from "../../types/ContextTypeEnum";

export class BS52Modal extends Modal implements ModalContract {

    private modal: any;

    private modalEl: HTMLElement | null;
    private titleEl: HTMLElement | null = null;
    private bodyCaptionEl: HTMLElement | null = null;
    private bodyEl: HTMLElement | null = null;
    private submitEl: HTMLElement | null = null;
    private submitTextEl: HTMLElement | null = null;
    private submitSpinnerEl: HTMLElement | null = null;
    private cancelEl: HTMLElement | null = null;
    private cancelTextEl: HTMLElement | null = null;
    private overlayEl: HTMLElement | null = null;
    private alertEl: HTMLElement | null = null;

    constructor(modalId: string, modalData: ModalDataInterface, modalUsage: ModalUsageEnum, showNoty: boolean, tools: any) {
        super(modalId, modalData, modalUsage, showNoty);
        this.modalEl = document.getElementById(`${this.modalId}`);
        if (this.modalEl) {
            this.modal = new tools.bootstrap.Modal(`#${this.modalId}`);
            this.titleEl = this.modalEl.querySelector(`#${this.modalId}__title`);
            this.bodyCaptionEl = this.modalEl.querySelector(`#${this.modalId}__body_caption`);
            this.bodyEl = this.modalEl.querySelector(`#${this.modalId}__body`);
            this.submitEl = this.modalEl.querySelector(`#${this.modalId}__btn_submit`);
            this.submitTextEl = this.modalEl.querySelector(`#${this.modalId}__btn_submit_text`);
            if (this.submitEl) {
                this.submitEl.onclick = () => {
                    this.submit();
                };
            }
            this.submitSpinnerEl = this.modalEl.querySelector(`#${this.modalId}__btn_submit_spinner`);
            this.cancelEl = this.modalEl.querySelector(`#${this.modalId}__btn_cancel`);
            this.cancelTextEl = this.modalEl.querySelector(`#${this.modalId}__btn_cancel_text`);
            this.overlayEl = this.modalEl.querySelector(`#${this.modalId}__overlay`);
            this.alertEl = this.modalEl.querySelector(`#${this.modalId}__alert`);
        }
    }

    private showEl(el: HTMLElement | null): void {
        if (el?.classList.contains('d-none')) {
            el?.classList.remove('d-none');
        }
    }

    private hideEl(el: HTMLElement | null): void {
        if (!el?.classList.contains('d-none')) {
            el?.classList.add('d-none');
        }
    }

    protected modalShow(): void {
        this.modal.show();
    }

    protected modalHide(): void {
        this.modal.hide();
    }

    protected modalShowAlerts(alertList: string[], contextType: ContextTypeEnum): void {
        if (this.alertEl) {
            let classList: string[] = [];
            Object.keys(ContextTypeEnum).forEach((key, index) => {
                classList.push(`alert-${key}`);
            });

            let html: string = '';
            if (alertList.length === 1) {
                html = alertList[0];
            } else {
                html += '<ul>';
                alertList.forEach((alert: string) => {
                    html += `<li>${alert}</li>`;
                });
                html += '</ul>';
            }

            this.alertEl.innerHTML = html;
            this.alertEl.classList.remove(...classList);
            this.alertEl.classList.add(`alert-${contextType}`);
            this.showEl(this.alertEl);
        }
    }

    protected modalClearAlerts(): void {
        if (this.alertEl) {
            this.alertEl.innerHTML = '';
            this.hideEl(this.alertEl);
        }
    }

    protected modalOverlayShow(): void {
        this.showEl(this.overlayEl);
    }

    protected modalOverlayHide(): void {
        this.hideEl(this.overlayEl);
    }

    protected modalSubmitShow(): void {
        this.showEl(this.submitEl);
    }

    protected modalSubmitHide(): void {
        this.hideEl(this.submitEl);
    }

    protected modalSubmitSpinnerShow(): void {
        this.showEl(this.submitSpinnerEl);
    }

    protected modalSubmitSpinnerHide(): void {
        this.hideEl(this.submitSpinnerEl);
    }

    protected modalButtonsEnable(): void {
    }

    protected modalButtonsDisable(): void {
    }

    protected modalSetTitle(text: string): void {
        if (this.titleEl) {
            this.titleEl.innerHTML = text;
        }
    }

    protected modalSetSubmitText(text: string): void {
        if (this.submitTextEl) {
            this.submitTextEl.innerHTML = text;
        }
    }

    protected modalSetCancelText(text: string): void {
        if (this.cancelTextEl) {
            this.cancelTextEl.innerHTML = text;
        }
    }

    protected modalSetBodyCaption(text: string): void {
        if (this.bodyCaptionEl) {
            this.bodyCaptionEl.innerHTML = text;
        }
    }

    protected modalSetBodyText(text: string): void {
        if (this.bodyEl) {
            this.bodyEl.innerHTML = text;
        }
    }
}
