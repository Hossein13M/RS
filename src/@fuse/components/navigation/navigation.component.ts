import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigation } from '../../types';
import { AuthorizationService } from '../../../app/modules/authorization/authorization.service';

@Component({
    selector: 'fuse-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FuseNavigationComponent implements OnInit {
    @Input()
    layout = 'vertical';

    @Input()
    public navigation: Array<FuseNavigation> = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(private _changeDetectorRef: ChangeDetectorRef, private _fuseNavigationService: FuseNavigationService) {
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
        // Load the navigation either from the input or from the service
        // this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();
        this.navigation = AuthorizationService.checkUserAccess();

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationItemAdded.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            // Load the navigation
            // this.navigation = this._fuseNavigationService.getCurrentNavigation();

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });

        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }
}
