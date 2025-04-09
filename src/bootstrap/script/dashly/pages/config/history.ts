import { Page } from '../../../../../services/PageService/Page';

export default class Omx_Resource_Config_History extends Page {
  init() {
    window.tableHistory(this.getDefaultTableHistoryId('Config'));
  }
}
