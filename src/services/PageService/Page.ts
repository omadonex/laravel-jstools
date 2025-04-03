import * as $ from "jquery";

export class Page {
    public pageId: string;

    constructor() {
        this.pageId = this.getPageId();
    }

    private getPageId(): string {
        return this.constructor.name;
    }

    protected getDefaultTableId(tableIndex: string = 'Default'): string {
        return `${this.pageId}__Table${tableIndex}`;
    }

    protected getDefaultTableHistoryId(tableIndex: string = 'Default'): string {
        return `${this.pageId}__Table${tableIndex}History`;
    }

    protected getDefaultTableModelHistoryId(tableIndex: string = 'Default'): string {
        return `${this.pageId}__Table${tableIndex}ModelHistory`;
    }

    protected getDynamicColumns(tableId: string, hasActions: boolean = true, hasActionsPre: boolean = false): Array<any> {
        const columnsData = JSON.parse(($(`#${tableId}_columns_data`).val() || '{}') as string);

        const columnsList = [] as Array<any>;

        if (hasActionsPre) {
            columnsList.push({data: 'actions_pre', name: 'actions_pre', orderable: false, className: 'spase-between'});
        }

        for (const column in columnsData) {
            columnsList.push({
                data: column,
                name: column,
                searchable: columnsData[column]['searchable'] !== undefined ? columnsData[column]['searchable'] : true,
                orderable: columnsData[column]['orderable'] !== undefined ? columnsData[column]['orderable'] : true,
                className: columnsData[column]['className'] !== undefined ? columnsData[column]['className'] : '',
            });
        }

        if (hasActions) {
            columnsList.push({data: 'actions', name: 'actions', orderable: false, className: 'spase-between'});
        }

        return columnsList;
    }

    protected inputFilterNumber(value: string): boolean {
        return /^-?\d*[,]?\d*$/.test(value);
    }

    protected inputFilterNumberPos(value: string): boolean {
        return /^\d*[,]?\d*$/.test(value);
    }

    protected inputFilterNumberNeg(value: string): boolean {
        return /^-\d*[,]?\d*$/.test(value);
    }
}
