import {ModalContract} from "./contracts/ModalContract";
import {Modal} from "./Modal";
import {ModalDataInterface} from "./interfaces/ModalDataInterface";
import {ModalUsageEnum} from "./ModalUsageEnum";

export class BS52Modal extends Modal implements ModalContract {

    private modal: any;

    private submitEl: HTMLElement;
    private submitSpinnerEl: HTMLElement | null;
    private overlayEl: HTMLElement | null

    constructor(modalId: string, modalData: ModalDataInterface, modalUsage: ModalUsageEnum, tools: any) {
        super(modalId, modalData, modalUsage);
        this.modal = new tools.bootstrap.Modal(`#${this.modalId}`);
        this.submitEl = document.getElementById(`${this.prefix}btn_submit`) as HTMLElement;
        this.submitEl.onclick = () => { this.submit() };
        this.submitSpinnerEl = document.getElementById(`${this.prefix}btn_submit_spinner`);
        this.overlayEl = document.getElementById(`${this.prefix}overlay`);
    }

    protected modalShow(): void {
        this.modal.show();
    }

    protected modalHide(): void {
        this.modal.hide();
    }

    protected modalOverlayShow(): void {
        if (this.overlayEl?.classList.contains('d-none')) {
            this.overlayEl?.classList.remove('d-none');
        }
    }

    protected modalOverlayHide(): void {
        if (!this.overlayEl?.classList.contains('d-none')) {
            this.overlayEl?.classList.add('d-none');
        }
    }

    protected modalSubmitShow(): void {
        if (this.submitEl.classList.contains('d-none')) {
            this.submitEl.classList.remove('d-none');
        }
    }

    protected modalSubmitHide(): void {
        if (!this.submitEl.classList.contains('d-none')) {
            this.submitEl.classList.add('d-none');
        }
    }

    protected modalSubmitSpinnerShow(): void {
        if (this.submitSpinnerEl?.classList.contains('d-none')) {
            this.submitSpinnerEl?.classList.remove('d-none');
        }
    }

    protected modalSubmitSpinnerHide(): void {
        if (!this.submitSpinnerEl?.classList.contains('d-none')) {
            this.submitSpinnerEl?.classList.add('d-none');
        }
    }

    protected setTitle(text: string): void {

    }

    protected setSubmitText(text: string): void {

    }

    protected setCancelText(text: string): void {

    }

    protected setBodyText(text: string): void {

    }
}
