import { Page } from '../../../services/PageService/Page';

export default class Root_Acl_User_History extends Page {
  init() {
    window.tableHistory(this.getDefaultTableHistoryId('User'));
  }
}
