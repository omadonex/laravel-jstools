/**
 * Делает первую букву заглавной
 * @param str
 */
function fUpCase(str: string): string {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

/**
 * Получение свойства объекта в стиле "Dot notation"
 * @param obj
 * @param prop
 */
function getProp(obj: any, prop: string): any {
    if (typeof obj === 'undefined') {
        return undefined;
    }

    const index = prop.indexOf('.');
    if (index > -1) {
        return getProp(obj[prop.substring(0, index)], prop.substring(index + 1));
    }

    return obj[prop];
}

/**
 * Проверка строки на число
 * @param value
 */
function isNumeric(value: any): boolean {
    if (typeof value !== 'string') {
        return false;
    }

    return !isNaN(Number(value));
}

function isEmpty(value: any): boolean {
    return Object.keys(value).length === 0;
}

export { fUpCase, getProp, isNumeric, isEmpty };