import { FormContract } from '../../Form/contracts/FormContract';

export interface ModalContract {
  show(): void;
  hide(): void;
  showOverlay(): void;
  hideOverlay(): void;
  showSubmitSpinner(): void;
  hideSubmitSpinner(): void;
  enableButtons(): void;
  disableButtons(): void;
  setForm(form: FormContract | null): void;
  callSubmitCallback(): void;
}
