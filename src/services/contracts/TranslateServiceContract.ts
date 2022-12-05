export interface TranslateServiceContract {
    t(key: string, replaceList?: any, lang?: string): string;
    t__validate(rule: string, replaceList: any, lang?: string): string
}