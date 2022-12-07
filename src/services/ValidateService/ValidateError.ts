import {TranslateServiceContract} from "../TranslateService/contracts/TranslateServiceContract";

export default class ValidateError {
  private rule: string;
  private replaceList: any;

  constructor(rule: string, replaceList: any = []) {
    this.rule = rule;
    this.replaceList = replaceList;
  }

  addReplace(name: string, value: string): void {
    this.replaceList[name] = value;
  }

  toText(translateService: TranslateServiceContract) {
    return translateService.t__validate(this.rule, this.replaceList);
  }
}
