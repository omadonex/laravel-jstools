import { getProp } from '../scripts/helpers';
import {TranslateServiceContract} from "./contracts/TranslateServiceContract";
import {TranslateServiceInitDataInterface} from "./interfaces/TranslateServiceInitDataInterface";

export default class TranslateService implements TranslateServiceContract {
    private langDefault: string;
    private langCurrent: string;
    private translationList: any;

    private namespaceList = {
        rules: 'app.validation',
        omxCommon: 'vendor.support.common',
        omxCurrency: 'vendor.support.currency',
    };

    constructor(data: TranslateServiceInitDataInterface) {
        this.langDefault = data.langDefault;
        this.langCurrent = data.langCurrent;
        this.translationList = data.translationList;
    }

    public t(key: string, replaceList?: any, lang?: string): string {
        let locale = lang === undefined ? this.langCurrent : lang;
        let text = getProp(this.translationList, `${locale}.${key}`);

        for (let prop in replaceList || {}) {
            text = text.replace(`:${prop}`, replaceList[prop]);
        }

        return text;
    }

    public t__validate(rule: string, replaceList: any, lang?: string): string {
        if ('attribute' in replaceList) {
            replaceList['attribute'] = this.t(`${this.namespaceList.rules}.attributes.${replaceList['attribute']}`, {}, lang);
        }
        return this.t(`${this.namespaceList.rules}.${rule}`, replaceList, lang);
    }
}