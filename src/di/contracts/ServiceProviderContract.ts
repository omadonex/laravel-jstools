export interface ServiceProviderContract {
  setAppData(appData: any): void;

  register(): void;

  getClassMap(): any;
  getAliasMap(): any;
}
