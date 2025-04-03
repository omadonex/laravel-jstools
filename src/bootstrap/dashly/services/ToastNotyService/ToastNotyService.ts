import { Service } from 'laravel-jstools-di';

import { ContextTypeEnum } from '../../../../types/ContextTypeEnum';
import { NotyDataInterface } from '../../../../services/NotyService/interfaces/NotyDataInterface';
import { NotyServiceContract } from '../../../../services/NotyService/contracts/NotyServiceContract';

export class ToastNotyService extends Service implements NotyServiceContract {
  private containerId: string;
  private tools: any;

  private containerEl: HTMLElement;

  constructor(containerId: string, tools: any) {
    super();
    this.containerId = containerId;
    this.tools = tools;

    this.containerEl = document.getElementById(containerId) as HTMLElement;
  }

  show(data: NotyDataInterface): void {
    if (data.message) {
      const toastId = this.generateId();
      this.containerEl.innerHTML += this.html(toastId, data.context, data.message);
      const toastEl = document.getElementById(toastId) as HTMLElement;

      toastEl.addEventListener('hidden.bs.toast', () => {
        this.containerEl.removeChild(toastEl);
      });

      new this.tools.bootstrap.Toast(`#${toastId}`, { delay: data.delay || 5000 }).show();
    }
  }

  private generateId(): string {
    return `toast-${+new Date()}`;
  }

  private html(id: string, context: ContextTypeEnum, message: string): string {
    return `
            <div id="${id}" class="toast align-items-center text-bg-${context} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;
  }
}
