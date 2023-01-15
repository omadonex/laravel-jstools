import {Service} from "../Service";
import {NotyServiceContract} from "./contracts/NotyServiceContract";
import {NotyDataInterface} from "./interfaces/NotyDataInterface";

export class AlertNotyService extends Service implements NotyServiceContract {

    public show(data: NotyDataInterface): void {
        alert(data.message);
    }

    public hide(): void {

    }
}