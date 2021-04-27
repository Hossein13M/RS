import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseMatchMediaService } from '@fuse/services/match-media.service';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fuse-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls: ['./shortcuts.component.scss'],
})
export class FuseShortcutsComponent implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private _cookieService: CookieService,
        private _fuseMatchMediaService: FuseMatchMediaService,
        private _fuseNavigationService: FuseNavigationService,
        private _mediaObserver: MediaObserver,
        private _renderer: Renderer2,
        private router: Router
    ) {
        // Set the defaults
        this.shortcutItems = [];
        this.searching = false;
        this.mobileShortcutsPanelActive = false;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    shortcutItems: any[];
    navigationItems: any[];
    filteredNavigationItems: any[];
    searching: boolean;
    mobileShortcutsPanelActive: boolean;

    showAlarmDialog = false;

    @Input()
    navigation: any;

    @ViewChild('searchInput')
    searchInputField;

    @ViewChild('shortcuts')
    shortcutsEl: ElementRef;

    @ViewChild('alarmContainer') alarmContainer: ElementRef;

    // Private
    private _unsubscribeAll: Subject<any>;

    isWorking: any;

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement): void {
        if (this.alarmContainer) {
            const clickedInside = this.alarmContainer.nativeElement.contains(targetElement);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        // Get the navigation items and flatten them
        this.filteredNavigationItems = this.navigationItems = this._fuseNavigationService.getFlatNavigation(this.navigation);

        if (localStorage.getItem('shortcuts')) {
            this.shortcutItems = JSON.parse(localStorage.getItem('shortcuts'));
        } else {
            // User's shortcut items
            this.shortcutItems = [
                // {
                //     title: 'Calendar',
                //     type: 'item',
                //     icon: 'today',
                //     url: '/apps/calendar'
                // },
                {
                    title: 'ایمیل',
                    type: 'item',
                    icon: 'email',
                    url: '/messaging/mail',
                },
                // {
                //     title: 'Contacts',
                //     type: 'item',
                //     icon: 'account_box',
                //     url: '/apps/contacts'
                // },
                // {
                //     title: 'To-Do',
                //     type: 'item',
                //     icon: 'check_box',
                //     url: '/apps/todo'
                // },
                // {
                //     title: 'پیام ها',
                //     type: 'item',
                //     icon: 'notifications',
                //     url: '/alarming/list'
                // }
            ];
        }
    }

    changeRouting(shortcutItem): void {
        if (shortcutItem.icon === 'notifications') {
            this.showAlarmDialog = !this.showAlarmDialog;
            return;
        }

        if (shortcutItem.url.includes('mail')) {
            this.router.navigate(['messaging', 'mail']);
            return;
        }

        this.router.navigate([shortcutItem.url]);
    }

    ngAfterViewInit(): void {
        // Subscribe to media changes
        this._fuseMatchMediaService.onMediaChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            if (this._mediaObserver.isActive('gt-sm')) {
                this.hideMobileShortcutsPanel();
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Search
     *
     * @param event
     */
    search(event): void {
        const value = event.target.value.toLowerCase();

        if (value === '') {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;

            return;
        }

        this.searching = true;

        this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
            return navigationItem.title.toLowerCase().includes(value);
        });
    }

    /**
     * Toggle shortcut
     *
     * @param event
     * @param itemToToggle
     */
    toggleShortcut(event, itemToToggle): void {
        event.stopPropagation();

        for (let i = 0; i < this.shortcutItems.length; i++) {
            if (this.shortcutItems[i].url === itemToToggle.url) {
                this.shortcutItems.splice(i, 1);

                // Save to the cookies
                this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));

                return;
            }
        }

        this.shortcutItems.push(itemToToggle);

        // Save to the LocalStorage
        localStorage.setItem('shortcuts', JSON.stringify(this.shortcutItems));
    }

    /**
     * Is in shortcuts?
     *
     * @param navigationItem
     * @returns {any}
     */
    isInShortcuts(navigationItem): any {
        return this.shortcutItems.find((item) => {
            return item.url === navigationItem.url;
        });
    }

    /**
     * On menu open
     */
    onMenuOpen(): void {
        setTimeout(() => {
            this.searchInputField.nativeElement.focus();
        });
    }

    /**
     * Show mobile shortcuts
     */
    showMobileShortcutsPanel(): void {
        this.mobileShortcutsPanelActive = true;
        this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }

    /**
     * Hide mobile shortcuts
     */
    hideMobileShortcutsPanel(): void {
        this.mobileShortcutsPanelActive = false;
        this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }

    handleError(): boolean {
        return false;
    }
}
