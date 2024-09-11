import { FormContract } from '../../Form/contracts/FormContract';
import {ModalDataInterface} from "../interfaces/ModalDataInterface";

export interface ModalContract {
  getModalData(): ModalDataInterface;
  show(): void;
  hide(): void;
  showOverlay(): void;
  hideOverlay(): void;
  showSubmitSpinner(): void;
  hideSubmitSpinner(): void;
  showLoadingSpinner(): void;
  hideLoadingSpinner(): void;
  showExtraSpinners(): void;
  hideExtraSpinners(): void;
  enableButtons(): void;
  disableButtons(): void;
  setForm(form: FormContract | null): void;
  callSubmitCallback(): void;
  setExtraSpinners(spinnerList: any): void;
}
