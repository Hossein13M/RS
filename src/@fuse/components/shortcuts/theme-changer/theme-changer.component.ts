import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FuseConfigService } from '../../../services/config.service';
import { FuseNavigationService } from '../../navigation/navigation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-theme-changer',
    templateUrl: './theme-changer.component.html',
    styleUrls: ['./theme-changer.component.scss'],
})
export class ThemeChangerComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    private unsubscribeAll: Subject<any>;
    private fuseConfig: any;
    public currentTheme = JSON.parse(localStorage.getItem('theme')).colorTheme;

    constructor(private readonly fb: FormBuilder, private fuseConfigService: FuseConfigService, private fuseNavigationService: FuseNavigationService) {
        this.unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    private initializeForm(): void {
        this.form = this.fb.group({
            colorTheme: new FormControl(),
            customScrollbars: new FormControl(),
            layout: this.fb.group({
                style: new FormControl(),
                width: new FormControl(),
                navbar: this.fb.group({
                    primaryBackground: new FormControl(),
                    secondaryBackground: new FormControl(),
                    folded: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl(),
                    variant: new FormControl(),
                }),
                toolbar: this.fb.group({
                    background: new FormControl(),
                    customBackgroundColor: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl(),
                }),
                footer: this.fb.group({
                    background: new FormControl(),
                    customBackgroundColor: new FormControl(),
                    hidden: new FormControl(),
                    position: new FormControl(),
                }),
                sidepanel: this.fb.group({
                    hidden: new FormControl(),
                    position: new FormControl(),
                }),
            }),
        });
        this.instantiateFuseConfiguration();
    }

    private instantiateFuseConfiguration(): void {
        this.fuseConfigService.config.pipe(takeUntil(this.unsubscribeAll)).subscribe((config) => {
            this.fuseConfig = config;

            this.form.setValue(config, { emitEvent: false });
        });

        this.form
            .get('layout.style')
            .valueChanges.pipe(takeUntil(this.unsubscribeAll))
            .subscribe(() => this.resetFormValues());

        this.form.valueChanges.pipe(takeUntil(this.unsubscribeAll)).subscribe((config) => (this.fuseConfigService.config = config));
    }

    private resetFormValues(): void {
        this.form.patchValue({
            layout: {
                width: 'fullwidth',
                navbar: {
                    primaryBackground: 'fuse-navy-700',
                    secondaryBackground: 'fuse-navy-900',
                    folded: false,
                    hidden: false,
                    position: 'right',
                    variant: 'vertical-style-1',
                },
                toolbar: { background: 'fuse-white-500', customBackgroundColor: false, hidden: false, position: 'below-static' },
                footer: { background: 'fuse-navy-900', customBackgroundColor: true, hidden: false, position: 'below-static' },
                sidepanel: { hidden: false, position: 'left' },
            },
        });
    }

    public onThemeChangeClick(): void {
        this.currentTheme === 'theme-default' ? (this.currentTheme = 'theme-blue-gray-dark') : (this.currentTheme = 'theme-default');
        this.form.get('colorTheme').setValue(this.currentTheme);
        this.instantiateFuseConfiguration();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }
}
