export interface CallbackListInterface {
    start?: () => any,
    finish?: () => any,
    success?: (data: any) => any,
    error?: (errorList: any) => any,
}