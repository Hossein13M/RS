import { AfterViewInit, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { BehaviorSubject } from 'rxjs';

export enum searchSelectStateType {
    'LOADING',
    'PRESENT',
    'FAILED',
    'INIT',
}

export interface SearchSelectDataType {
    list: Array<any>;
    state: searchSelectStateType;
}

@Component({
    selector: 'app-search-select',
    templateUrl: './search-select.component.html',
    styleUrls: ['./search-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchSelectComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => SearchSelectComponent),
            multi: true,
        },
    ],
})
export class SearchSelectComponent implements OnInit, ControlValueAccessor, Validator, AfterViewInit, OnChanges {
    data: SearchSelectDataType = { list: [], state: searchSelectStateType.INIT };
    stateType = searchSelectStateType;

    @Input() appearance: MatFormFieldAppearance = 'outline';
    @Input() color: 'primary';
    @Input() label = 'لیبل';
    @Input() placeholder = 'جستجو';

    @Input() noEntriesFoundLabel: 'یافت نشد';

    @Input() outputValueForm = 'only-value'; // all only-value
    @Input() valuePropertyName: string;
    @Input() uiPropertyName: string;

    @Input() set list(value: Array<any>) {
        this.data.list = value;
        this.data.state = searchSelectStateType.PRESENT;
    }

    @Input() set state(value: searchSelectStateType) {
        this.data.state = value;
    }

    @Input() searchFn: (searchKey: any, data: SearchSelectDataType) => void;

    @Input() multi;

    @Input() set disabled(value) {
        if (value) {
            this.searchResultControl.disable();
            this.isDisabled = true;
        } else {
            this.searchResultControl.enable();
            this.isDisabled = false;
        }
    }

    @Input() showClearButton = true;
    @Input() required = false;

    @Input() set touched(newTouchValue) {
        if (newTouchValue) {
            this.touchedValue = true;
            setTimeout(() => {
                this.touchedValue = false;
            }, 3_000);
        }
    }

    touchedValue = false;

    searchControl = this.fb.control('');
    searchResultControl = this.fb.control('');
    output: BehaviorSubject<any>;
    isDisabled = false;

    selected: any;

    show = true;

    public onTouched: () => void = () => {};

    compareCategoryObjects = (a: any, b: any) => a && b && a[this.valuePropertyName] === b[this.valuePropertyName];

    constructor(private fb: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes) {
            return;
        }
        if (changes.hasOwnProperty('multi') && changes.multi.currentValue !== undefined) {
            this.show = false;
            setTimeout(() => (this.show = true), 100);
        }
    }

    ngOnInit(): void {
        this.output = new BehaviorSubject('');

        this.searchControl.valueChanges.subscribe((newSearchFilter: string) => {
            if (this.searchFn) {
                this.searchFn(newSearchFilter, this.data);
            }
        });

        this.searchResultControl.valueChanges.subscribe((newResult) => {
            if (newResult) {
                this.touched = true;
            }
            this.selected = newResult;

            switch (this.outputValueForm) {
                case 'all': {
                    this.output.next(newResult);
                    break;
                }
                case 'only-value': {
                    if (this.multi) {
                        if (!newResult || !Array.isArray(newResult)) {
                            this.output.next([]);
                            break;
                        }
                        this.output.next(
                            newResult.filter((el) => el?.hasOwnProperty(this.valuePropertyName)).map((el) => el[this.valuePropertyName])
                        );
                        break;
                    }

                    if (newResult && newResult.hasOwnProperty(this.valuePropertyName)) {
                        this.output.next(newResult[this.valuePropertyName]);
                    } else {
                        this.output.next(null);
                    }
                    break;
                }
            }
        });
    }

    ngAfterViewInit(): void {}

    // ---------------------------------- FORM

    writeValue(newValue: any): void {
        this.selected = newValue;
        this.searchResultControl.setValue(newValue);
    }

    registerOnChange(fn: any): void {
        this.output.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.searchControl.disable();
            this.isDisabled = true;
        } else {
            this.searchControl.enable();
            this.isDisabled = false;
        }
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return null;
        // return this.addressForm.valid ? null : { invalidForm: { valid: false, message: 'Address fields are invalid' } };
    }

    openSearchDialog(): void {}

    clearInput(event: MouseEvent): void {
        event.stopPropagation();
        this.searchResultControl.reset();
        this.selected = null;
    }

    checkIfArray(value: any): boolean {
        return Array.isArray(value);
    }

    checkItemIfNotSelected(item: any): boolean {
        if (this.checkIfArray(this.selected)) {
            return this.selected && item && !this.selected.some((el) => el[this.valuePropertyName] === item[this.valuePropertyName]);
        }
        return this.selected && item && item !== this.selected && item[this.valuePropertyName] !== this.selected[this.valuePropertyName];
    }
}
