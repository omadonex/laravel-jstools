import { Page } from '../../../services/PageService/Page';
import { CallbackListInterface } from '../../../services/AxiosService/interfaces/CallbackListInterface';

export default class Root_Acl_User_Show extends Page {
  init() {
    window.initHistoryTab(this.pageId, this.getDefaultTableModelHistoryId('User'), {
      searching: false,
      lengthChange: false,
    });

    window.form(`${this.pageId}__formAttachRole`);
    window.form(`${this.pageId}__formChangePass`);

    const tableUserRolesId = `${this.pageId}__TableUserRoles`;
    const deleteRoleUrl = $(`#${this.pageId}__TableUserRoles_urlRowDelete`).val();
    $(`#${tableUserRolesId}`).on('click', '.js-row-delete', function () {
      const $button = $(this);
      const rowId = $button.data('rowId');
      const $row = $button.parent().parent();

      const callbackList: CallbackListInterface = {
        start: () => {
          $button.hide();
        },
        finish: () => {
          $button.show();
        },
        success: () => {
          $row.empty();
        },
      };
      window.App.make('a').send(
        {
          url: deleteRoleUrl,
          method: 'DELETE',
          data: {
            role_id: rowId,
          },
        },
        callbackList,
      );
    });
  }
}
