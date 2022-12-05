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

export { getProp };