type CachesType = {
    [key: string]: any;
};

export const CacheObject: CachesType = {};

export const KEYS = {};

/**
 * Cache data
 * @param key
 * @param data
 * @param expiredTime
 */
export function cache(key: string, data: any, expiredTime: number = EXPIRED_TIME) {
    CacheObject[key] = {
        data,
        expiredTime: new Date().getTime() + expiredTime,
    };
}

export const EXPIRED_TIME = 40000;
/**
 *
 * @param {string} key should be a key of KEYS dictionary above
 * @param {function} promiseFunc
 * @param {number} expiredTime in ms
 * @returns {Promise<*>}
 */
export async function cachePromise(key: string, promiseFunc: Function, expiredTime = EXPIRED_TIME) {
    const cachedData = getCache(key);
    if (cachedData !== null) {
        return cachedData;
    }
    const data = (promiseFunc && (await promiseFunc())) || null;
    if (data) {
        cache(key, data, expiredTime);
    }
    return data;
}

/**
 * Get cache data
 * @param key
 * @returns {null|*}
 */
export function getCache(key: string) {
    const cacheData = CacheObject[key];
    if (cacheData && cacheData.expiredTime > new Date().getTime()) {
        return cacheData.data;
    }
    return null;
}

/**
 * @param key
 */

export const clearCache = (key: string) => {
    if (!CacheObject[key]) {
        return;
    }
    return delete CacheObject[key];
};

export const clearAllCaches = async () => {
    Object.keys(CacheObject).forEach((key) => delete CacheObject[key]);
};
