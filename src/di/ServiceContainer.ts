import {JST_AbstractNotBindToConcreteException} from "../exceptions/JST_AbstractNotBindToConcreteException";
import {ClassInfoInterface} from "./interfaces/ClassInfoInterface";
import {Service} from "../services/Service";
import {EntityTypeEnum} from "../entities/EntityTypeEnum";
import {ServiceListInterface} from "../interfaces/ServiceListInterface";
import {Entity} from "../entities/Entity";

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

    private createInstance(className: string, params: any): any {
        if (className in this.classMap) {
            const classInfo: ClassInfoInterface = this.classMap[className];
            const instance = classInfo.closure(params);

            if (instance instanceof Service || instance instanceof Entity) {
                const dependsList: string[] = instance.getServiceDependsList();
                const serviceList: ServiceListInterface = {};
                dependsList.forEach((item, i, arr) => {
                    serviceList[item] = this.createInstance(item, params);
                });

                instance.setServiceList(serviceList);
            }

            return instance;
        }

        throw JST_AbstractNotBindToConcreteException(`Can't create instance of "${className}"! Abstract is not bind!`);
    }

    private getInstance(className: string, params: any): any {
        const classInfo = this.classMap[className];

        if (classInfo && classInfo.singleton) {
            if (!(className in this.data)) {
                this.data[className] = this.createInstance(className, params);
            }

            return this.data[className];
        }

        return this.createInstance(className, params);
    }

    public make(name: string): any {
        if (name in this.aliasMap) {
            return this.getInstance(this.aliasMap[name], {});
        }

        return this.getInstance(name, {});
    }

    public makeEntity(name: string, entityType: EntityTypeEnum, params: any): any {
        return this.getInstance(name, Object.assign(params, { entityType }));
    }
}