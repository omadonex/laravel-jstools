import { Page } from '../../../../../services/PageService/Page';

export default class Omx_Resource_Config_Show extends Page {
  init() {
    window.initHistoryTab(this.pageId, this.getDefaultTableModelHistoryId('Config'), {
      searching: false,
      lengthChange: false,
    });
  }
}
