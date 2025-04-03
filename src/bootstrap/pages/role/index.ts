import { Page } from "../../../services/PageService/Page";

export default class Root_Acl_Role_Index extends Page {
    init() {
        const tableId = this.getDefaultTableId('Role');
        const columns = this.getDynamicColumns(tableId);

        const table = window.table(tableId, columns);

        window.initButtonCreate(table, tableId);
    }
}
