import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
// @ts-ignore
import version from '../../../../../package.json';
import {fuseAnimations} from "../../../../@fuse/animations";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ChangePasswordComponent implements OnInit {
    version = version.version;

    constructor(private _fuseConfigService: FuseConfigService) {
        this._fuseConfigService.config = {
            layout: {
                navbar: { hidden: true },
                toolbar: { hidden: true },
                footer: { hidden: true },
                sidepanel: { hidden: true },
            },
        };
    }

    ngOnInit(): void {}
}
