import {JST_AbstractNotBindToConcreteException} from "../exceptions/JST_AbstractNotBindToConcreteException";
import {ClassInfoInterface} from "./interfaces/ClassInfoInterface";
import {Service} from "../services/Service";
import {ServiceListInterface} from "../services/ServiceListInterface";

export class ServiceContainer {
    private classMap: any;
    private aliasMap: any;
    private data: any;

    constructor() {
        this.classMap = {};
        this.aliasMap = {};
        this.data = {};
    }

    public setMaps(classMap: any, aliasMap: any): void {
        this.classMap = classMap;
        this.aliasMap = aliasMap;
    }

    private createInstance(className: string): any {
        if (className in this.classMap) {
            let classInfo: ClassInfoInterface = this.classMap[className];
            let instance = classInfo.closure();

            if (instance instanceof Service) {
                let dependsList: string[] = instance.getServiceDependsList();
                let serviceList: ServiceListInterface = {};
                dependsList.forEach((item, i, arr) => {
                    serviceList[item] = this.createInstance(item);
                });

                instance.setServiceList(serviceList);
            }

            return instance;
        }

        throw JST_AbstractNotBindToConcreteException(`Can't create instance of "${className}"! Abstract is not bind!`);
    }

    private getInstance(className: string): any {
        let classInfo = this.classMap[className];

        if (classInfo && classInfo.singleton) {
            if (!(className in this.data)) {
                this.data[className] = this.createInstance(className);
            }

            return this.data[className];
        }

        return this.createInstance(className);
    }

    public make(name: string): any {
        if (name in this.aliasMap) {
            return this.getInstance(this.aliasMap[name]);
        }

        return this.getInstance(name);
    }
}