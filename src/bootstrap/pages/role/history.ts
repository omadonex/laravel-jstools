import { Page } from '../../../services/PageService/Page';

export default class Omx_Resource_Role_History extends Page {
  init() {
    window.tableHistory(this.getDefaultTableHistoryId('Role'));
  }
}
