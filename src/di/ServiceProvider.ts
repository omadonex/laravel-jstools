import { ServiceProviderContract } from './contracts/ServiceProviderContract';

export abstract class ServiceProvider implements ServiceProviderContract {
  private classMap: any = {};
  private aliasMap: any = {};

  protected appData: any;

  public abstract register(): void;

  public setAppData(appData: any): void {
    this.appData = appData;
  }

  public bind(abstract: string, concrete: (params: any) => any): void {
    this.classMap[abstract] = {
      closure: concrete,
    };
  }

  public alias(abstract: string, alias: string): void {
    this.aliasMap[alias] = abstract;
  }

  public singleton(abstract: string, concrete: (params: any) => any): void {
    this.classMap[abstract] = {
      closure: concrete,
      singleton: true,
    };
  }

  public getClassMap(): any {
    return this.classMap;
  }

  public getAliasMap(): any {
    return this.aliasMap;
  }
}
