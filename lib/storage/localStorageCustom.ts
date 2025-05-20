import {removeTokenCookie, setTokenCookie} from "@/lib/storage/cookies";
import {authStorageKey} from "@/lib/config";

export const saveToLocalStorage = (value: any, key: string) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
        if (key === authStorageKey) {
            setTokenCookie(serializedState, key)
        }
    } catch (e) {
        console.warn(e);
    }
}

export const loadFromLocalStorage = (key: string) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

export const clearFromLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
        if (key === authStorageKey){
            removeTokenCookie(authStorageKey)
        }
    } catch (e) {
        console.warn(e);
    }
}