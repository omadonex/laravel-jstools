import { App } from "../../../app/App";
import { EntityTypeEnum } from "../../../entities/EntityTypeEnum";
import { FormContract } from "../../../entities/Form/contracts/FormContract";
import { FormDataInterface } from "../../../entities/Form/interfaces/FormDataInterface";
import { ModalContract } from "../../../entities/Modal/contracts/ModalContract";
import { ModalDataInterface } from "../../../entities/Modal/interfaces/ModalDataInterface";
import { ModalUsageEnum } from "../../../entities/Modal/ModalUsageEnum";
import { NotyDataInterface } from "../../../services/NotyService/interfaces/NotyDataInterface";
import { AnyObjInterface } from "../../../interfaces/AnyObjInterface";

declare global {
    interface Window {
        App: App,
        langData: any,
        notyData: any,

        noty: (notyData: NotyDataInterface) => void,
        table: (tableId: string, columns: Array<AnyObjInterface>, scroll?: boolean, options?: AnyObjInterface, callbacks?: AnyObjInterface) => any,
        tableFilterData: (data: any, tableId: string) => any,
        tableHistory: (tableId: string, options?: AnyObjInterface) => any,
        form: (formId: string, formData?: FormDataInterface, componentsOptions?: AnyObjInterface) => FormContract | null,
        modal: (modalId: string, modalUsage: ModalUsageEnum, modalData?: ModalDataInterface) => ModalContract | null,
        modalConfirmDeleteTableRow: (rowCaption: string, url: string, table?: any, tableId?: string, callback?: any) => void,

        initButtonCreate: (table: any, tableId: string, callback?: any) => any,
        initHistoryTab: (pageId: string, tableId: string, options?: AnyObjInterface) => any,

        initButtonCreateSettingColumn: (tableId: string) => any,

        initButtonExport: (tableId: string) => void,
        initButtonImport: (pageId: string) => void,
        initButtonImportTemplate: (pageId: string) => void,
    }
}

window.App = new App({
    lang: window.langData || {},
});

window.noty = (notyData: NotyDataInterface) => {
    window.App.noty(notyData);
}

window.table = (tableId: string, columns: Array<AnyObjInterface>, scroll: boolean = true, options: AnyObjInterface = {}, callbacks: AnyObjInterface = {}) => {
    const fullTableId = `#${tableId}`;
    const $table = $(fullTableId);
    const pageId = tableId.split('__Table')[0];
    const scrollOpt = scroll ? { dom: '<lf<"wrapper-scroller"t>ip>', bAutoWidth: false,} : {};
    const table = $table.DataTable(Object.assign({
        aaSorting: [],
        ajax: {
            url: $(`${fullTableId}_urlData`).val() as string,
            data: function (data: any) {
                const columnsList = $(`#${tableId}__colSelect`).val();
                return {
                    ...window.tableFilterData(data, tableId),
                    ...{tableId, pageId},
                    ...{[tableId+'__filter_columns']: columnsList}
                }
            },
        },
        columns: columns,
        preDrawCallback: function () {
            $(`${fullTableId}_length`).find('select').addClass('form-select form-select-sm');
            $(`${fullTableId}_filter`).find('input').addClass('form-control form-control-sm');
        },
        initComplete: function () {
            $table.on('change', '.filter-input', function () {
                table.draw();
            });

            $table.on('click', '.js-row-edit', function () {
                const $this = $(this);
                const formId = `${tableId}__formEdit`;
                const modalId = `${tableId}__modalEdit`;

                const formEdit = window.form(formId, {
                    noBtn: true,
                    ajax: true,
                });
                formEdit?.setAction(formEdit?.getAction().replace('*', $this.data('rowId')));

                const modalEdit = window.modal(modalId, ModalUsageEnum.form, {
                    preloadData: {
                        method: 'GET',
                        url: ($(`${fullTableId}_urlRowData`).val() as string).replace('*', $this.data('rowId')),
                    },
                    submitCallback: () => { table.draw(); },
                });
                modalEdit?.setForm(formEdit);
                modalEdit?.show();

                if (callbacks.jsRowEdit) {
                    callbacks.jsRowEdit(formId, modalId, formEdit, modalEdit);
                }
            });

            $table.on('click', '.js-row-delete', function () {
                const $this = $(this);
                const rowCaption = $this.data('rowCaption');
                const url = ($(`${fullTableId}_urlRowDelete`).val() as string).replace('*', $this.data('rowId'));
                window.modalConfirmDeleteTableRow(rowCaption, url, table, fullTableId.substring(1));
            });

            $(`#${tableId}__colSelect`).on('change',function () {
                $(`#${tableId}__form`).submit();
            });

            if (callbacks.initComplete) {
                callbacks.initComplete();
            }
        }
    }, options, scrollOpt) as any);

    return table;
}

window.tableFilterData = function (data, tableId) {
    const checkboxNames: any = [];
    $(`.${tableId}.filter.filter-input[type="checkbox"], #${tableId}.filter.filter-input[type="checkbox"]`).each(function() {
        const $this = $(this);
        data[$this.attr('name') as string] = $this.is(':checked') ? 'on' : 'off';
        checkboxNames.push($this.attr('name'));
    });

    const componentNames: any = [];
    $(`.${tableId} .filter .filter-input[data-jst-component], #${tableId} .filter .filter-input[data-jst-component]`).each(function() {
        const $this = $(this);
        const name = $this.data('jstField') as string;
        const id = $this.attr('id') as string;
        data[name] = window.components[id].getValue();
        componentNames.push(name);
    });

    $.each($(`.${tableId} .filter .filter-input, #${tableId} .filter .filter-input`).serializeArray(), function (index, element) {
        if ((checkboxNames.indexOf(element.name) === -1) && (componentNames.indexOf(element.name) === -1)) {
            if (element.name.indexOf('[]') > 0) {
                if (!data[element.name]) {
                    data[element.name] = [];
                }
                data[element.name].push(element.value);
            } else {
                data[element.name] = element.value;
            }
        }
    });

    return data;
}

window.form = (formId: string, formData: FormDataInterface = {}, componentsOptions: AnyObjInterface = {}) => {
    componentsOptions['jstree'] = window.cmpJsTreeOptions;
    componentsOptions['quill'] = window.cmpQuillOptions;
    componentsOptions['flatpickr'] = window.cmpFlatPickrOptions;

    if (!!document.getElementById(formId)) {
        return window.App.form(formId, formData, !!formData.ajax, componentsOptions, EntityTypeEnum.bs_5_2);
    }

    return null;
}

window.modal = (modalId: string, modalUsage: ModalUsageEnum, modalData: ModalDataInterface = {}) => {
    if (!!document.getElementById(modalId)) {
        return window.App.modal(modalId, modalUsage, modalData, true, {bootstrap: window.bootstrap}, EntityTypeEnum.bs_5_2);
    }

    return null;
}

window.modalConfirmDeleteTableRow = (rowCaption: string, url: string, table?: any, tableId?: string, callback?: any) => {
    window.modal(!!tableId ? `${tableId}_ModalConfirmDelete` : 'PartialsModalConfirmDelete', ModalUsageEnum.confirm, {
        bodyText: rowCaption,
        submitData: {
            url: url,
            method: 'DELETE',
        },
        submitCallback: () => { callback ? callback() : table?.draw(); },
    })?.show();
}

window.initButtonCreate = (table: any, tableId: string, callback: any = null) => {
    $(`#${tableId}__btnCreate`).on('click', () => {
        const formId = `${tableId}__formCreate`;
        const modalId = `${tableId}__modalCreate`;
        const preloadUrl = $(`#${formId}_urlData`).val() as string;
        const formCreate = window.form(formId, {
            noBtn: true,
            ajax: true,
        });

        const modalCreate = window.modal(modalId, ModalUsageEnum.form, Object.assign({
            submitCallback: () => { table.draw(); },
        }, !preloadUrl ? {} : {
            preloadData: {
                method: 'GET',
                url: preloadUrl,
            },
        }));
        modalCreate?.setForm(formCreate);
        modalCreate?.show();

        if (callback) {
            callback(formId, modalId, formCreate, modalCreate);
        }
    });
}

window.initHistoryTab = (pageId: string, tableId: string, options: AnyObjInterface = {}) => {
    let table: any = null;
    const buttonPaneHistoryEl: any = document.getElementById(`${pageId}__tabCard__buttonHistory`);
    const tabPaneHistoryEl: any = document.getElementById(`${pageId}__tabCard__paneHistory`);
    if (tabPaneHistoryEl?.classList.contains('active')) {
        if (table === null) {
            table = window.tableHistory(tableId, options);
        }
    }
    buttonPaneHistoryEl?.addEventListener('shown.bs.tab', (event: any) => {
        if (table === null) {
            table = window.tableHistory(tableId, options);
        }
    });

    return table;
}

window.initButtonCreateSettingColumn = (tableId: string) => {
    $(`#${tableId}__btnCreateColumns`).on('click', () => {
        const formId = `${tableId}__formCreateSettingColumns`;
        const modalId = `${tableId}__modalCreateSettingColumns`;
        const backTab: string = $(`#${formId}__inpBackTab`).val() as string;

        const formCreate = window.form(formId, {
            noBtn: true,
            ajax: true,
        });
        const modalCreate = window.modal(modalId, ModalUsageEnum.form, {
            submitCallback: () => {
                let url = window.location.href;
                if (backTab) {
                    url += (url.indexOf('?') > -1) ? '&' : '?' + "tab=" + encodeURIComponent(backTab);
                }
                window.location.href = url;
            },
        });
        modalCreate?.setForm(formCreate);
        modalCreate?.show();
    });
}

window.initButtonExport = (tableId: string) => {
    const formId = `${tableId}__formExport`;
    const form = window.form(formId);
    form?.setSubmitButton($(`#${tableId}__btnExport`));
}

window.initButtonImport = (pageId: string) => {
    const formId = `${pageId}__formImport`;
    const form = window.form(formId);
    //form?.setSubmitButton($(`#${formId}__btnUpload`));
}

window.initButtonImportTemplate = (pageId: string) => {
    const formId = `${pageId}__formImportTemplate`;
    const form = window.form(formId);
    form?.setSubmitButton($(`#${formId}__btnDownload`));
}
