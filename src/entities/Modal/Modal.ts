import {ModalContract} from "./contracts/ModalContract";
import {ModalDataInterface} from "./interfaces/ModalDataInterface";
import {ModalUsageEnum} from "./ModalUsageEnum";
import {FormContract} from "../Form/contracts/FormContract";
import {JSToolsAbstractMap} from "../../app/JSToolsAbstractMap";

export abstract class Modal implements ModalContract {
    protected serviceDependsList: string[] = [
        JSToolsAbstractMap.AxiosServiceContract,
        JSToolsAbstractMap.NotyServiceContract,
    ];
    protected modalId: string;
    protected prefix: string;
    protected modalData: ModalDataInterface;
    protected modalUsage: ModalUsageEnum;
    protected form: FormContract | null;

    constructor(modalId: string, modalData: ModalDataInterface, modalUsage: ModalUsageEnum) {
        this.modalId = modalId;
        this.prefix = `${this.modalId}__`;
        this.modalData = modalData;
        this.modalUsage = modalUsage;
        this.form = null;
    }

    private load(): void {
        this.modalOverlayHide();
        this.modalSubmitSpinnerHide();
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

    public show(): void {
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
                if (typeof this.modalData.submitCallback !== 'undefined') {
                    this.hide();
                    this.modalData.submitCallback();
                    return;
                }

                if (typeof this.modalData.submitData !== 'undefined') {
                    this.modalSubmitSpinnerShow();
                    this.showOverlay();
                    // axios(this.modalData.submitData)
                    //     .then((response) => {
                    //         if (response.data.status === true) {
                    //             this.hide();
                    //             if (response.data.noty) {
                    //                 this.notyService.show({
                    //                     type: NotyTypeEnum.success,
                    //                     text: response.data.noty,
                    //                 });
                    //             }
                    //         } else {
                    //             this.hideOverlay();
                    //             this.modalSubmitSpinnerHide();
                    //             if (response.data.noty) {
                    //                 this.notyService.show({
                    //                     type: NotyTypeEnum.error,
                    //                     text: response.data.noty,
                    //                 });
                    //             }
                    //             console.log(response.data);
                    //         }
                    //     }, (error) => {
                    //         this.hideOverlay();
                    //         this.modalSubmitSpinnerHide();
                    //         console.log(error);
                    //     });
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

    protected abstract modalShow(): void;
    protected abstract modalHide(): void;
    protected abstract modalOverlayShow(): void;
    protected abstract modalOverlayHide(): void
    protected abstract modalSubmitShow(): void;
    protected abstract modalSubmitHide(): void;
    protected abstract modalSubmitSpinnerShow(): void;
    protected abstract modalSubmitSpinnerHide(): void;

    protected abstract setTitle(text: string): void;
    protected abstract setSubmitText(text: string): void;
    protected abstract setCancelText(text: string): void;
    protected abstract setBodyText(text: string): void;



    private beforeShow(): void {
        if (this.modalData.title) {
            this.setTitle(this.modalData.title);
        }

        if (this.modalData.submitText) {
            this.setSubmitText(this.modalData.submitText);
        }

        if (this.modalData.cancelText) {
            this.setCancelText(this.modalData.cancelText);
        }

        if (this.modalData.bodyText) {
            this.setBodyText(this.modalData.bodyText);
        }

        // this.lockFields(openData.lock || []);
    }

    // public open(inputDataOrUrl: any, successCallback: any, openData: any, cancelCallback: any) {
    //     if (!this.isLoaded()) {
    //         this.load();
    //     }
    //
    //     //this.ml.clear();
    //     openData = openData || {};
    //     this.initOpen(openData);
    //     //const fnName = `${this.id}_openModalCallback`;
    //
    //     if (typeof inputDataOrUrl === 'string') {
    //         this.$modal.modal('show');
    //         this.showOverlay();
    //         // $.ajax({
    //         //     method: 'GET',
    //         //     url: inputDataOrUrl,
    //         //     data: {
    //         //         _token: $('meta[name="csrf-token"]').attr('content'),
    //         //     },
    //         //     success: (response) => {
    //         //         this.hideOverlay();
    //         //         eval(fnName)(this, response.data, successCallback, openData.submitData, cancelCallback);
    //         //     },
    //         //     error: (response) => {
    //         //         this.hide();
    //         //         X5Lab.noty.error('Не удалось открыть модальное окно. Непредвиденная ошибка');
    //         //         console.log(response);
    //         //     },
    //         // });
    //     } else {
    //         this.openModalCallback(this, inputDataOrUrl, successCallback, openData.submitData, cancelCallback);
    //         this.$modal.modal('show');
    //     }
    // }
}
