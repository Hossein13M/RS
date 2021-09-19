import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthorizationService } from '../../../modules/authorization/authorization.service';
import { FuseNavigation } from '../../../../@fuse/types';
import { AlertService } from '#shared/services/alert.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    public navigation: Array<FuseNavigation> = [];
    userStatusOptions: any[];

    private _unsubscribeAll: Subject<any>;
    user;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private authorizationService: AuthorizationService,
        private readonly alertService: AlertService
    ) {
        this.user = JSON.parse(localStorage.getItem('user'));

        this.userStatusOptions = [
            { title: 'Online', icon: 'icon-checkbox-marked-circle', color: '#4CAF50' },
            { title: 'Away', icon: 'icon-clock', color: '#FFC107' },
            { title: 'Do not Disturb', icon: 'icon-minus-circle', color: '#F44336' },
            { title: 'Invisible', icon: 'icon-checkbox-blank-circle-outline', color: '#BDBDBD' },
            { title: 'Offline', icon: 'icon-checkbox-blank-circle-outline', color: '#616161' },
        ];

        this.navigation = AuthorizationService.checkUserAccess();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((settings) => {
            this.horizontalNavbar = settings.layout.navbar.position === 'top';
            this.rightNavbar = settings.layout.navbar.position === 'right';
            this.hiddenNavbar = settings.layout.navbar.hidden === true;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    logout() {
        this.authorizationService.logOut().finally(() => this.alertService.onInfo('شما از نرم‌افزار خارج شدید'));
    }
}
