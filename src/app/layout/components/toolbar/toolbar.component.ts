import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/dashboard-configs/navigation';
import { UserInfoService } from 'app/services/App/userInfo/user-info.service';
import { AuthenticationService } from 'app/services/authentication.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    navigation: any;
    userStatusOptions: any[];

    private _unsubscribeAll: Subject<any>;
    user;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private authenticationService: AuthenticationService,
        private userInfoService: UserInfoService
    ) {
        // this.userInfoService.userInfo$.subscribe((res) => {
        // }, () => {
        // });
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);

        this.userStatusOptions = [
            { title: 'Online', icon: 'icon-checkbox-marked-circle', color: '#4CAF50' },
            { title: 'Away', icon: 'icon-clock', color: '#FFC107' },
            { title: 'Do not Disturb', icon: 'icon-minus-circle', color: '#F44336' },
            { title: 'Invisible', icon: 'icon-checkbox-blank-circle-outline', color: '#BDBDBD' },
            { title: 'Offline', icon: 'icon-checkbox-blank-circle-outline', color: '#616161' },
        ];

        this.navigation = navigation;
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

    search(): void {}

    logout() {
        this.authenticationService.logout();
    }
}
