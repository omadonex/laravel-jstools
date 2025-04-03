import { Page } from "../../../services/PageService/Page";

export default class Root_Acl_Role_History extends Page {
    init() {
        window.tableHistory(this.getDefaultTableHistoryId('Role'));
    }
}
