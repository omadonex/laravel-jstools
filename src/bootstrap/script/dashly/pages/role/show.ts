import { Page } from '../../../../../services/PageService/Page';

export default class Omx_Resource_Role_Show extends Page {
  init() {
    window.initHistoryTab(this.pageId, this.getDefaultTableModelHistoryId('Role'), {
      searching: false,
      lengthChange: false,
    });
  }
}
