import {Service} from "../Service";
import {NotyServiceContract} from "./contracts/NotyServiceContract";
import {NotyDataInterface} from "./interfaces/NotyDataInterface";

export class ConsoleNotyService extends Service implements NotyServiceContract {

    public show(data: NotyDataInterface): void {
        console.log(data.message);
    }

    public hide(): void {

    }
}