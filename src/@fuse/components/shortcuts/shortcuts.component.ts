import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';
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
        this.shortcutItems = [];
        this.searching = false;
        this.mobileShortcutsPanelActive = false;
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
    private _unsubscribeAll: Subject<any>;
    isWorking: any;
    @HostListener('document:click', ['$event.target'])
    ngOnInit(): void {
        this.filteredNavigationItems = this.navigationItems = this._fuseNavigationService.getFlatNavigation(this.navigation);

        if (localStorage.getItem('shortcuts')) this.shortcutItems = JSON.parse(localStorage.getItem('shortcuts'));
        else {
            this.shortcutItems = [
                // { title: 'Calendar', type: 'item', icon: 'today', url: '/apps/calendar' },
                { title: 'ایمیل', type: 'item', icon: 'email', url: '/messaging/mail' },
                // { title: 'Contacts', type: 'item', icon: 'account_box', url: '/apps/contacts' },
                // { title: 'To-Do', type: 'item', icon: 'check_box', url: '/apps/todo' },
                // { title: 'پیام ها', type: 'item', icon: 'notifications', url: '/alarming/list' },
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
        this._fuseMatchMediaService.onMediaChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            if (this._mediaObserver.isActive('gt-sm')) this.hideMobileShortcutsPanel();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

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

    toggleShortcut(event, itemToToggle): void {
        event.stopPropagation();

        for (let i = 0; i < this.shortcutItems.length; i++) {
            if (this.shortcutItems[i].url === itemToToggle.url) {
                this.shortcutItems.splice(i, 1);
                this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
                return;
            }
        }

        this.shortcutItems.push(itemToToggle);
        localStorage.setItem('shortcuts', JSON.stringify(this.shortcutItems));
    }

    isInShortcuts(navigationItem): any {
        return this.shortcutItems.find((item) => {
            return item.url === navigationItem.url;
        });
    }

    onMenuOpen(): void {
        setTimeout(() => this.searchInputField.nativeElement.focus());
    }

    showMobileShortcutsPanel(): void {
        this.mobileShortcutsPanelActive = true;
        this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }

    hideMobileShortcutsPanel(): void {
        this.mobileShortcutsPanelActive = false;
        this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }

    handleError(): boolean {
        return false;
    }
}
