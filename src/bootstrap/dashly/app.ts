import './bootstrap/dashly/modules/jquery';
import './bootstrap/dashly/modules/bootstrap';
import './bootstrap/dashly/modules/common';
import './bootstrap/dashly/modules/components';
import './bootstrap/dashly/modules/application';
import { PageList } from '../pages/_pages';

import BootstrapDashlyServiceProvider from "./providers/BootstrapDashlyServiceProvider";
window.App.registerProvider(new BootstrapDashlyServiceProvider);

import {DashlyService} from "./services/DashlyService/DashlyService";
import {PageServiceContract} from "../../services/PageService/contracts/PageServiceContract";
const dashly: DashlyService = window.App.make('d') as DashlyService;
dashly.enableSidebarBehaviourChanger();
dashly.enableThemeSwitcher();

(window.App.make('p') as PageServiceContract).registerPageList(PageList);
