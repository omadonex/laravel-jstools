import {FormContract} from "../../Form/contracts/FormContract";

export interface ModalContract {
    show(): void;
    hide(): void;
    showOverlay(): void;
    hideOverlay(): void;
    setForm(form: FormContract | null): void;
}