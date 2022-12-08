import {JSToolsAbstractMap} from "../JSToolsAbstractMap";
import {ServiceProvider} from "../../di/ServiceProvider";
import {TranslateService} from "../../services/TranslateService/TranslateService";

export class AppServiceProvider extends ServiceProvider {
    public register(): void {
        this.singleton(JSToolsAbstractMap.TranslateServiceContract, (): any => {
            return new TranslateService({
                langDefault: this.appData.lang.default,
                langCurrent: this.appData.lang.current,
                translationList: this.appData.lang.translationList,
            });
        });

        this.alias(JSToolsAbstractMap.TranslateServiceContract, 't');
    }
}