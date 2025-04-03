import { Page } from '../../../services/PageService/Page';

export default class Omx_Resource_User_History extends Page {
  init() {
    window.tableHistory(this.getDefaultTableHistoryId('User'));
  }
}
