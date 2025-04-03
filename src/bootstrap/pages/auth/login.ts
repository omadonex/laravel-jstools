import { Page } from '../../../services/PageService/Page';

export default class Auth_Login extends Page {
  init() {
    window.form(`${this.pageId}__formLogin`);
  }
}
