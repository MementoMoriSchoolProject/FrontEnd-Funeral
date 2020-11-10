import _ from "lodash";
/**
 * converts a given object with numeric keys to an array
 */
export function objectToArray<T>(obj?: {[key: number]: T}): T[] {
    if (!obj) return [];
    return (Object.values(obj) as T[]).map(it => _.omit(it as any, '__typename') as T);
}

/**
 * converts a given array to an object with numeric keys
 */
export function arrayToObject<T>(array?: T[]): {[key: number]: T} {
    if (!array) return {};
    return {...array};
}