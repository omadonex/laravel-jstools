import { TranslateServiceContract } from '../TranslateService/contracts/TranslateServiceContract';

export class ValidateError {
  private field: string;
  private rule: string;
  private replaceList: any;
  private text: string;

  constructor(field: string, rule: string, replaceList: any = [], text: string = '') {
    this.field = field;
    this.rule = rule;
    this.replaceList = replaceList;
    this.addReplace('attribute', this.field);
    this.text = text;
  }

  addReplace(name: string, value: string): void {
    this.replaceList[name] = value;
  }

  toText(translateService: TranslateServiceContract) {
    return this.text !== '' ? this.text : translateService.t__validate(this.rule, this.replaceList);
  }
}
