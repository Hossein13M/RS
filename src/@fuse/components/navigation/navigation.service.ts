import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import * as _ from 'lodash';

import { FuseNavigationItem } from '@fuse/types';
import { UserInfoService } from '../../../app/services/App/userInfo/user-info.service';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class FuseNavigationService {
    onItemCollapsed: Subject<any>;
    onItemCollapseToggled: Subject<any>;

    // Private
    private _onNavigationChanged: BehaviorSubject<any>;
    private _onNavigationRegistered: BehaviorSubject<any>;
    private _onNavigationUnregistered: BehaviorSubject<any>;
    private _onNavigationItemAdded: BehaviorSubject<any>;
    private _onNavigationItemUpdated: BehaviorSubject<any>;
    private _onNavigationItemRemoved: BehaviorSubject<any>;

    private _currentNavigationKey: string;
    private _registry: { [key: string]: any } = {};

    /**
     * Constructor
     */
    constructor(private userInfoService: UserInfoService) {
        // Set the defaults
        this.onItemCollapsed = new Subject();
        this.onItemCollapseToggled = new Subject();

        // Set the private defaults
        this._currentNavigationKey = null;
        this._onNavigationChanged = new BehaviorSubject(null);
        this._onNavigationRegistered = new BehaviorSubject(null);
        this._onNavigationUnregistered = new BehaviorSubject(null);
        this._onNavigationItemAdded = new BehaviorSubject(null);
        this._onNavigationItemUpdated = new BehaviorSubject(null);
        this._onNavigationItemRemoved = new BehaviorSubject(null);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get onNavigationChanged
     *
     * @returns {Observable<any>}
     */
    get onNavigationChanged(): Observable<any> {
        return this._onNavigationChanged.asObservable();
    }

    /**
     * Get onNavigationRegistered
     *
     * @returns {Observable<any>}
     */
    get onNavigationRegistered(): Observable<any> {
        return this._onNavigationRegistered.asObservable().pipe(
            switchMap(
                (value: boolean): Observable<any> => {
                    if (value !== null) {
                        return of(value);
                    } else {
                        return EMPTY;
                    }
                }
            )
        );
    }

    /**
     * Get onNavigationUnregistered
     *
     * @returns {Observable<any>}
     */
    get onNavigationUnregistered(): Observable<any> {
        return this._onNavigationUnregistered.asObservable();
    }

    /**
     * Get onNavigationItemAdded
     *
     * @returns {Observable<any>}
     */
    get onNavigationItemAdded(): Observable<any> {
        return this._onNavigationItemAdded.asObservable();
    }

    /**
     * Get onNavigationItemUpdated
     *
     * @returns {Observable<any>}
     */
    get onNavigationItemUpdated(): Observable<any> {
        return this._onNavigationItemUpdated.asObservable();
    }

    /**
     * Get onNavigationItemRemoved
     *
     * @returns {Observable<any>}
     */
    get onNavigationItemRemoved(): Observable<any> {
        return this._onNavigationItemRemoved.asObservable();
    }

    // FIXME: Implement right access management
    private applyAccessToNavigation(navigation): any {
        let newNavigation = JSON.parse(JSON.stringify(navigation));

        // -----------------------------------------------------
        // const labels = [];
        // const extractNames = (nav: any) => {
        //     if (!nav || !nav.forEach) {
        //         return;
        //     }
        //     if (nav.forEach) {
        //         nav?.forEach((el) => {
        //             if (el.children) {
        //                 extractNames(el.children);
        //             }
        //             labels.push({ id: el.id, url: el?.url });
        //         });
        //     } else {
        //         if (nav.children) {
        //             extractNames(nav.children);
        //         }
        //     }
        // };
        // extractNames(newNavigation);
        // console.log(labels.map((el) => el.id).join('|'));
        // -----------------------------------------------------

        const access = {};
        this.userInfoService.userInfo?.role?.split('|').forEach((el) => (access[el] = true));
        const checkAccess = (nav: any): Array<any> => {
            const out = [];
            if (nav?.forEach) {
                nav.forEach((originalEl) => {
                    const el = JSON.parse(JSON.stringify(originalEl));
                    if (el?.children) {
                        el.children = checkAccess(el.children);
                    }
                    if (access[el?.id] && el) {
                        out.push(el);
                    }
                });
            } else {
                if (nav?.children) {
                    nav.children = checkAccess(nav.children);
                }
                if (access[nav?.id] && nav) {
                    out.push(nav);
                }
            }
            return out;
        };
        newNavigation = checkAccess(newNavigation);
        return newNavigation;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register the given navigation
     * with the given key
     *
     * @param key
     * @param navigation
     */
    register(key, navigation): void {
        // FIXME: Remove and correct flow
        const run = () => {
            const newNavigation = this.applyAccessToNavigation(navigation);
            // Check if the key already being used
            if (this._registry[key]) {
                console.error(`The navigation with the key '${key}' already exists. Either unregister it first or use a unique key.`);

                return;
            }
            // Add to the registry
            this._registry[key] = newNavigation;
            this._currentNavigationKey = key;
            // Notify the subject
            this._onNavigationRegistered.next([key, newNavigation]);
        };

        if (this.userInfoService.userInfo) {
            run();
        } else {
            this.userInfoService.userInfo$.pipe(take(1)).subscribe(() => {
                run();
            });
        }
    }

    /**
     * Unregister the navigation from the registry
     * @param key
     */
    unregister(key): void {
        // Check if the navigation exists
        if (!this._registry[key]) {
            console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);
        }

        // Unregister the sidebar
        delete this._registry[key];

        // Notify the subject
        this._onNavigationUnregistered.next(key);
    }

    /**
     * Get navigation from registry by key
     *
     * @param key
     * @returns {any}
     */
    getNavigation(key): any {
        // Check if the navigation exists
        if (!this._registry[key]) {
            console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);

            return;
        }

        // Return the sidebar
        return this._registry[key];
    }

    /**
     * Get flattened navigation array
     *
     * @param navigation
     * @param flatNavigation
     * @returns {any[]}
     */
    getFlatNavigation(navigation, flatNavigation: FuseNavigationItem[] = []): any {
        for (const item of navigation) {
            if (item.type === 'item') {
                flatNavigation.push(item);

                continue;
            }

            if (item.type === 'collapsable' || item.type === 'group') {
                if (item.children) {
                    this.getFlatNavigation(item.children, flatNavigation);
                }
            }
        }

        return flatNavigation;
    }

    /**
     * Get the current navigation
     *
     * @returns {any}
     */
    getCurrentNavigation(): any {
        if (!this._currentNavigationKey) {
            console.warn(`The current navigation is not set.`);

            return;
        }

        return this.getNavigation(this._currentNavigationKey);
    }

    /**
     * Set the navigation with the key
     * as the current navigation
     *
     * @param key
     */
    setCurrentNavigation(key): void {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);

            return;
        }

        // Set the current navigation key
        this._currentNavigationKey = key;

        // Notify the subject
        this._onNavigationChanged.next(key);
    }

    /**
     * Get navigation item by id from the
     * current navigation
     *
     * @param id
     * @param {any} navigation
     * @returns {any | boolean}
     */
    getNavigationItem(id, navigation = null): any | boolean {
        if (!navigation) {
            navigation = this.getCurrentNavigation();
        }

        for (const item of navigation) {
            if (item.id === id) {
                return item;
            }

            if (item.children) {
                const childItem = this.getNavigationItem(id, item.children);

                if (childItem) {
                    return childItem;
                }
            }
        }

        return false;
    }

    /**
     * Get the parent of the navigation item
     * with the id
     *
     * @param id
     * @param {any} navigation
     * @param parent
     */
    getNavigationItemParent(id, navigation = null, parent = null): any {
        if (!navigation) {
            navigation = this.getCurrentNavigation();
            parent = navigation;
        }

        for (const item of navigation) {
            if (item.id === id) {
                return parent;
            }

            if (item.children) {
                const childItem = this.getNavigationItemParent(id, item.children, item);

                if (childItem) {
                    return childItem;
                }
            }
        }

        return false;
    }

    /**
     * Add a navigation item to the specified location
     *
     * @param item
     * @param id
     */
    addNavigationItem(item, id): void {
        // Get the current navigation
        const navigation: any[] = this.getCurrentNavigation();

        // Add to the end of the navigation
        if (id === 'end') {
            const run1 = () => {
                const accessCheckItem = this.applyAccessToNavigation(item);
                if (navigation) {
                    navigation.push(...accessCheckItem);
                    this._onNavigationItemAdded.next(true);
                }
            };
            if (this.userInfoService.userInfo) {
                run1();
            } else {
                this.userInfoService.userInfo$.pipe(take(1)).subscribe(() => {
                    run1();
                });
            }
            return;
        }

        // Add to the start of the navigation
        if (id === 'start') {
            const run1 = () => {
                const accessCheckItem = this.applyAccessToNavigation(item);
                if (navigation) {
                    navigation.unshift(...accessCheckItem);
                    this._onNavigationItemAdded.next(true);
                }
            };
            if (this.userInfoService.userInfo) {
                run1();
            } else {
                this.userInfoService.userInfo$.pipe(take(1)).subscribe(() => {
                    run1();
                });
            }
            return;
        }

        const run = () => {
            // Add it to a specific location
            const parent: any = this.getNavigationItem(id);

            if (parent) {
                // Check if parent has a children entry,
                // and add it if it doesn't
                if (!parent.children) {
                    parent.children = [];
                }
                const accessCheckItem = this.applyAccessToNavigation(item);

                // Add the item
                parent.children.push(...accessCheckItem);
            }

            // Trigger the observable
            this._onNavigationItemAdded.next(true);
        };
        if (this.userInfoService.userInfo) {
            run();
        } else {
            this.userInfoService.userInfo$.pipe(take(1)).subscribe(() => {
                run();
            });
        }
    }

    /**
     * Update navigation item with the given id
     *
     * @param id
     * @param properties
     */
    updateNavigationItem(id, properties): void {
        // Get the navigation item
        const navigationItem = this.getNavigationItem(id);

        // If there is no navigation with the give id, return
        if (!navigationItem) {
            return;
        }

        // Merge the navigation properties
        _.merge(navigationItem, properties);

        // Trigger the observable
        this._onNavigationItemUpdated.next(true);
    }

    /**
     * Remove navigation item with the given id
     *
     * @param id
     */
    removeNavigationItem(id): void {
        const item = this.getNavigationItem(id);

        // Return, if there is not such an item
        if (!item) {
            return;
        }

        // Get the parent of the item
        let parent = this.getNavigationItemParent(id);

        // This check is required because of the first level
        // of the navigation, since the first level is not
        // inside the 'children' array
        parent = parent.children || parent;

        // Remove the item
        parent.splice(parent.indexOf(item), 1);

        // Trigger the observable
        this._onNavigationItemRemoved.next(true);
    }
}
