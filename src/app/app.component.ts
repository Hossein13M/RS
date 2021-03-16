import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { navigation } from 'app/dashboard-configs/navigation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {Platform} _platform
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _platform: Platform
    ) {
        // Get default navigation
        this.navigation = navigation;
        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);
        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');
        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // Get Theme From LocalStorage
        if (localStorage.getItem('theme')) {
            this.fuseConfig = JSON.parse(localStorage.getItem('theme'));
            this._fuseConfigService.config = this.fuseConfig;
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((config) => {
            this.fuseConfig = config;

            // Save to localStorage
            localStorage.setItem('theme', JSON.stringify(config));

            // Boxed
            if (this.fuseConfig.layout.width === 'boxed') {
                this.document.body.classList.add('boxed');
            } else {
                this.document.body.classList.remove('boxed');
            }
            // Color theme - Use normal for loop for IE11 compatibility
            for (let i = 0; i < this.document.body.classList.length; i++) {
                const className = this.document.body.classList[i];
                if (className.startsWith('theme-')) {
                    this.document.body.classList.remove(className);
                }
            }
            this.document.body.classList.add(this.fuseConfig.colorTheme);
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
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
