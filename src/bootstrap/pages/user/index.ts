import { Page } from '../../../services/PageService/Page';

export default class Omx_Resource_User_Index extends Page {
  init() {
    const tableId = this.getDefaultTableId('User');
    const columns = this.getDynamicColumns(tableId);

    const table = window.table(tableId, columns);

    window.initButtonCreate(table, tableId);
  }
}
