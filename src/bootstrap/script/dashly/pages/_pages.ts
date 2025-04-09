import AuthLogin from './auth/login';

import OmxResourceConfigIndex from './config/index';
import OmxResourceConfigHistory from './config/history';
import OmxResourceConfigShow from './config/show';
import OmxResourceRoleIndex from './role/index';
import OmxResourceRoleHistory from './role/history';
import OmxResourceRoleShow from './role/show';
import OmxResourceUserIndex from './user/index';
import OmxResourceUserHistory from './user/history';
import OmxResourceUserShow from './user/show';

export const PageList = [
  AuthLogin,

  OmxResourceConfigIndex,
  OmxResourceConfigHistory,
  OmxResourceConfigShow,
  OmxResourceRoleIndex,
  OmxResourceRoleHistory,
  OmxResourceRoleShow,
  OmxResourceUserIndex,
  OmxResourceUserHistory,
  OmxResourceUserShow,
];
