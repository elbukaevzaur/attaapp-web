import Cookies from 'js-cookie';

export const setTokenCookie = (token, key) => {
    Cookies.set(key, token);
};

export const getTokenCookie = (key) => {
    try {
        const serializedState = Cookies.get(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
};

export const removeTokenCookie = (key) => {
    Cookies.remove(key);
};

