import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { navigation } from 'app/dashboard-configs/navigation';

@Component({
    selector: 'vertical-layout-1',
    templateUrl: './layout-1.component.html',
    styleUrls: ['./layout-1.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class VerticalLayout1Component implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(private _fuseConfigService: FuseConfigService) {
        // Set the defaults

        const userRoles = JSON.parse(localStorage.getItem('user'))  ?? { role: 'somethingElse' };

        if (userRoles.role === 'assets') {
            this.navigation = [navigation[2]];
        } else {
            this.navigation = navigation;
        }

        // navigation.forEach((navItem) => {
        //     userRoles.split('|').map((item) => {
        //         if (item === navItem.id) {
        //             this.navigation.push(navItem);
        //         }
        //     });
        // });

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((config) => (this.fuseConfig = config));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
