import * as $ from "jquery";

import {Form} from "./Form";
import {ValidateError} from "../../services/ValidateService/ValidateError";
import {TranslateServiceContract} from "../../services/TranslateService/contracts/TranslateServiceContract";
import {ValidateErrorListInterface} from "../../services/ValidateService/interfaces/ValidateErrorListInterface";
import {JQuerySerializeItemInterface} from "./interfaces/JQuerySerializeItemInterface";
import {AnyObjInterface} from "../../interfaces/AnyObjInterface";
import {JSToolsAbstractMap} from "../../app/JSToolsAbstractMap";
import {JQueryFormValidateService} from "../../services/FormValidateService/JQueryFormValidateService";
import {ContextTypeEnum} from "../../types/ContextTypeEnum";

export class JQueryForm extends Form {
    private $form: any;
    private $inputList: any;
    private $spinner: any;
    private $submit: any;
    private $alert: any;

    constructor(formId: string, formSubmit: boolean, showNoty: boolean) {
        super(formId, formSubmit, showNoty, new JQueryFormValidateService());
        this.$form = $(`#${this.formId}`);
        this.$inputList = this.$form.find('input[data-jst-field]');
        this.$spinner = this.$form.find('span[data-jst-spinner]');
        this.$submit = this.$form.find('button[data-jst-submit]');
        this.$alert = this.$form.find('div[data-jst-alert]');
        this.setSubmitButton(this.$submit);
        this.enableSubmitOnEnter();
    }

    protected showErrors(errorList: ValidateErrorListInterface): void {
        let translateService: TranslateServiceContract = this.getService(JSToolsAbstractMap.TranslateServiceContract);
        this.clearErrors();

        this.$inputList.each((index: number, element: any) => {
            let $input = $(element);
            let field = $input.data('jstField');
            if (!$input.data('jstNoValidate')) {
                if (field in errorList) {
                    let $divError = this.$form.find(`.invalid-feedback[data-jst-field="${field}"]`);
                    let error: ValidateError = Object.values(errorList[field])[0];
                    $divError.text(error.toText(translateService));
                    $input.addClass('is-invalid');
                } else {
                    $input.addClass('is-valid');
                }
            }
        });
    }

    protected clearErrors(): void {
        this.$inputList.removeClass('is-valid is-invalid');
    }

    protected showAlerts(alertList: string[], contextType: ContextTypeEnum): void {
        if (this.$alert) {
            let classList: string[] = [];
            Object.keys(ContextTypeEnum).forEach((key, index) => {
                classList.push(`alert-${key}`);
            });

            let html: string = '';
            html += '<ul>';
            alertList.forEach((alert: string) => {
               html += `<li>${alert}</li>`;
            });
            html += '</ul>';
            console.log(html);
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

    protected clearInputs(): void {
        //TODO omadonex: правильная очистка стартовых значений
        this.$inputList.val('');
    }

    protected getMethod(): string {
        return this.$form.attr('method');
    }

    protected getAction(): string {
        return this.$form.attr('action');
    }

    protected getToken(): string {
        return this.$form.find('input[name=_token]')[0].val();
    }

    protected callFormSubmit(): void {
        this.$form.submit();
    }

    protected disableSubmitBtn(): void {
        this.$submit.attr('disabled', 'disabled');
    }

    protected enableSubmitBtn(): void {
        this.$submit.prop('disabled', false);
    }

    protected showSpinner(): void {
        this.$spinner.removeClass('d-none');
    }

    protected hideSpinner(): void {
        this.$spinner.addClass('d-none');
    }

    protected disableFieldsInput(): void {
        this.$inputList.attr('readonly', true);
    }

    protected enableFieldsInput(): void {
        this.$inputList.attr('readonly', false);
    }

    public setSubmitButton(button: any): void {
        button.on('click', () => {
            this.submit();
        });
    }

    public enableSubmitOnEnter(): void {
        this.$form.on('keydown', (e: any) => {
            if (e.code === 'Enter') {
                if (!this.formSubmit) {
                    e.preventDefault();
                }
                this.submit();
            }
        });
    }

    public serialize(): AnyObjInterface {
        let data: AnyObjInterface = {};
        this.$form.serializeArray().forEach((item: JQuerySerializeItemInterface) => {
            data[item.name] = item.value;
        });

        return data;
    }
}
