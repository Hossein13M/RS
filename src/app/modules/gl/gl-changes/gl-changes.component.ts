import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { GlService } from 'app/modules/gl/gl.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TreeOrderType } from '../gl-tree/gl-tree.component';

@Component({
    selector: 'app-gl-changes',
    templateUrl: './gl-changes.component.html',
    styleUrls: ['./gl-changes.component.scss'],
    animations: [fuseAnimations],
})
export class GlChangesComponent implements OnInit {
    model?: any;
    isWorking: any;
    handleError: (err: import('@angular/common/http').HttpErrorResponse) => boolean;

    @ViewChild('showTypeInput') showTypeInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    visible = true;
    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    showTypeCtl = new FormControl();
    filteredShowTypes: Observable<string[]>;
    showTypes: string[] = ['کدهای با افزایش مبلغ', 'کدهای با کاهش مبلغ', 'کدهای حذف شده', 'کدهای اضافه شده'];
    allShowTypes: string[] = ['کدهای با افزایش مبلغ', 'کدهای با کاهش مبلغ', 'کدهای حذف شده', 'کدهای اضافه شده'];

    form: FormGroup;

    public displayedColumns = [
        'type',
        'categoryLedgerName',
        'groupLedgerName',
        'generalLedgerName',
        'subsidiaryLedgerName',
        'detailLedgerName',
        'balance1',
        'balance2',
        'changes',
        'rate',
    ];

    dataToShow = [];
    columns: any = [
        { id: 'type', name: 'نوع تغییر', type: 'string' },
        { id: 'categoryLedgerName', name: 'گروه', type: 'string' },
        { id: 'groupLedgerName', name: 'دسته', type: 'string' },
        { id: 'generalLedgerName', name: 'کل', type: 'string' },
        { id: 'subsidiaryLedgerName', name: 'معین', type: 'string' },
        { id: 'detailLedgerName', name: 'تفضیل', type: 'string' },
        { id: 'balance1', name: 'مانده ابتدا', type: 'price' },
        { id: 'balance2', name: 'مانده انتها', type: 'price' },
        { id: 'changes', name: 'مقدار تغییرات', type: 'price' },
        { id: 'rate', name: 'درصد تغییرات', type: 'number' },
    ];
    dataSource = new MatTableDataSource<any>(this.dataToShow);

    searchCollapse = false;

    glCategories: any[];
    glGroups: any[];
    glGeneral: any[];

    constructor(private fb: FormBuilder, private glService: GlService) {
        this.filteredShowTypes = this.showTypeCtl.valueChanges.pipe(
            startWith(null),
            map((c: string | null) => (c ? this._filter(c) : this.allShowTypes.slice()))
        );
    }

    ngOnInit(): void {
        this.createForm();

        this.glService.getLevelApi(null, TreeOrderType.Category).subscribe((res: any[]) => {
            this.glCategories = res;
        });

        this.form.get('categoryCode').valueChanges.subscribe((res) => {
            this.glGroups = [];
            res.forEach((gr) => {
                this.glService.getLevelApi(gr, TreeOrderType.Group).subscribe((x: any[]) => {
                    this.glGroups.push(...x);
                });
            });
        });

        this.form.get('groupCode').valueChanges.subscribe((res) => {
            this.glGeneral = [];
            res.forEach((ge) => {
                this.glService.getLevelApi(ge, TreeOrderType.General).subscribe((x: any[]) => {
                    this.glGeneral.push(...x);
                });
            });
        });
    }

    createForm(): void {
        this.form = this.fb.group({
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            categoryCode: ['', Validators.required],
            type: '',
            groupCode: '',
            generalCode: '',
            fromPercent: '',
            toPercent: '',
            fromValue: '',
            toValue: '',
        });
    }

    submitData(): void {
        const typeValues = [];

        this.showTypes.map((x) => {
            if (x === 'کدهای با افزایش مبلغ') {
                typeValues.push('increase');
            } else if (x === 'کدهای با کاهش مبلغ') {
                typeValues.push('decrease');
            } else if (x === 'کدهای حذف شده') {
                typeValues.push('delete');
            } else if (x === 'کدهای اضافه شده') {
                typeValues.push('add');
            }
        });

        this.form.get('type').setValue(typeValues);

        this.glService.getChangeApi(this.form.value).subscribe((res: any) => {
            this.dataToShow = res;
            this.searchCollapse = false;
        });
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            const index = this.allShowTypes.indexOf(value.trim());
            if (index > -1) {
                this.showTypes.push(value.trim());
            }
        }

        if (input) {
            input.value = '';
        }

        this.showTypeCtl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.showTypes.indexOf(fruit);

        if (index >= 0) {
            this.showTypes.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const index = this.showTypes.indexOf(event.option.viewValue);

        if (index === -1) {
            this.showTypes.push(event.option.viewValue);
        }

        this.showTypeInput.nativeElement.value = '';
        this.showTypeCtl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allShowTypes.filter((c) => c.toLowerCase().indexOf(filterValue) === 0);
    }
}
