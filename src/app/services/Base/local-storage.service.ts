import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() {}

    static setUserInfo(value) {
        localStorage.setItem(LocalStorageValue.userinfo, value);
    }

    static getUserInfo() {
        return JSON.parse(localStorage.getItem(LocalStorageValue.userinfo));
    }

    public static setNav(value) {
        localStorage.setItem(LocalStorageValue.nav, JSON.stringify(value));
    }

    public static getNav() {
        return JSON.parse(localStorage.getItem(LocalStorageValue.nav));
    }
}

export enum LocalStorageValue {
    userinfo = 'USERINFO',
    nav = 'NAV',
}
