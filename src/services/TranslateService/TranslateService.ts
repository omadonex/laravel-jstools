import { Service } from 'laravel-jstools-di';

import { getProp } from '../../scripts/helpers';
import { TranslateServiceContract } from './contracts/TranslateServiceContract';
import { TranslateServiceInitDataInterface } from './interfaces/TranslateServiceInitDataInterface';

export class TranslateService extends Service implements TranslateServiceContract {
  private langDefault: string;
  private langCurrent: string;
  private translationList: any;

  private namespaceList = {
    rules: 'app.validation',
    omxCommon: 'vendor.support.common',
    omxCurrency: 'vendor.support.currency',
  };

  constructor(data: TranslateServiceInitDataInterface) {
    super();
    this.langDefault = data.langDefault;
    this.langCurrent = data.langCurrent;
    this.translationList = data.translationList;
  }

  public t(key: string, replaceList?: any, lang?: string): string {
    const locale = lang === undefined ? this.langCurrent : lang;
    let text = getProp(this.translationList, `${locale}.${key}`);

    for (const prop of Object.keys(replaceList || {})) {
      text = text.replace(`:${prop}`, replaceList[prop]);
    }

    return text;
  }

  public t__validate(rule: string, replaceList: any, lang?: string): string {
    const attr = 'attribute';
    if (attr in replaceList) {
      replaceList[attr] = this.t(`${this.namespaceList.rules}.attributes.${replaceList[attr]}`, {}, lang);
    }
    return this.t(`${this.namespaceList.rules}.${rule}`, replaceList, lang);
  }
}
