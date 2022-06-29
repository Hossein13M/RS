import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    private _unsubscribeAll: Subject<any>;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _platform: Platform
    ) {
        this._fuseNavigationService.setCurrentNavigation('main');
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }
        this._unsubscribeAll = new Subject();

        if (localStorage.getItem('theme')) {
            this.fuseConfig = JSON.parse(localStorage.getItem('theme'));
            this._fuseConfigService.config = this.fuseConfig;
        }
    }

    ngOnInit(): void {
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((config) => {
            this.fuseConfig = config;

            localStorage.setItem('theme', JSON.stringify(config));

            if (this.fuseConfig.layout.width === 'boxed') {
                this.document.body.classList.add('boxed');
            } else {
                this.document.body.classList.remove('boxed');
            }
            for (let i = 0; i < this.document.body.classList.length; i++) {
                const className = this.document.body.classList[i];
                if (className.startsWith('theme-')) {
                    this.document.body.classList.remove(className);
                }
            }
            this.document.body.classList.add(this.fuseConfig.colorTheme);
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
