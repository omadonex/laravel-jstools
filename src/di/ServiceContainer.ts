import JST_AbstractNotBindToConcreteException from "../exceptions/JST_AbstractNotBindToConcreteException";
import {ClassInfoInterface} from "./interfaces/ClassInfoInterface";

export default class ServiceContainer {
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

    __createInstance(className: string): any {
        if (className in this.classMap) {
            let classInfo: ClassInfoInterface = this.classMap[className];

            // let depends = classInfo.depends || [];
            // let dependsData = {};
            // depends.forEach((item, i, arr) => {
            //     dependsData[item] = this.__createInstance(item);
            // });
            // initialData['__depends'] = dependsData;

            return classInfo.closure();
        }

        throw JST_AbstractNotBindToConcreteException(`Can't create instance of "${className}"! Abstract is not bind!`);
    }

    __getInstance(className: string): any {
        let classInfo = this.classMap[className];

        if (classInfo && classInfo.singleton) {
            if (!(className in this.data)) {
                this.data[className] = this.__createInstance(className);
            }

            return this.data[className];
        }

        return this.__createInstance(className);
    }

    make(name: string): any {
        if (name in this.aliasMap) {
            return this.__getInstance(this.aliasMap[name]);
        }

        return this.__getInstance(name);
    }
}