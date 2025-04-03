import { ServiceProvider } from 'laravel-jstools-di';

import { JSToolsAbstractMap } from '../../../app/JSToolsAbstractMap';
import { AbstractMap } from '../AbstractMap';
import { DashlyService } from '../services/DashlyService/DashlyService';
import { ToastNotyService } from '../services/ToastNotyService/ToastNotyService';

export default class BootstrapDashlyServiceProvider extends ServiceProvider {
  public register(): void {
    this.singleton(AbstractMap.DashlyServiceContract, (): any => {
      return new DashlyService();
    });
    this.alias(AbstractMap.DashlyServiceContract, 'd');

    this.singleton(JSToolsAbstractMap.NotyServiceContract, (): any => {
      return new ToastNotyService('toastContainer', { bootstrap: window.bootstrap });
    });
  }
}
