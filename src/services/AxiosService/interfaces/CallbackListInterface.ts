export interface CallbackListInterface {
    start?: () => any,
    finish?: () => any,
    success?: () => any,
    error?: () => any,
}