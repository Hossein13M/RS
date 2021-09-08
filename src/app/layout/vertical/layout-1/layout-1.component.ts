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
    private _unsubscribeAll: Subject<any>;

    constructor(private _fuseConfigService: FuseConfigService) {
        const userRoles = JSON.parse(localStorage.getItem('user')) ?? { role: 'somethingElse' };
        userRoles.role === 'assets' ? (this.navigation = [navigation[2]]) : (this.navigation = navigation);
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe((config) => (this.fuseConfig = config));
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
