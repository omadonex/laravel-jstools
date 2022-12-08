import {TranslateServiceContract} from "../TranslateService/contracts/TranslateServiceContract";

export class ValidateError {
  private field: string;
  private rule: string;
  private replaceList: any;

  constructor(field: string, rule: string, replaceList: any = []) {
    this.field = field;
    this.rule = rule;
    this.replaceList = replaceList;
    this.addReplace('attribute', this.field);
  }

  addReplace(name: string, value: string): void {
    this.replaceList[name] = value;
  }

  toText(translateService: TranslateServiceContract) {
    return translateService.t__validate(this.rule, this.replaceList);
  }
}
