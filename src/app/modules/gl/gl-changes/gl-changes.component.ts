import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { fuseAnimations } from '@fuse/animations';
import { GlService } from 'app/modules/gl/gl.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GlCategoryModel, GlGeneralModel, GlGroupModel, TreeOrderType } from '../gl.model';

@Component({
    selector: 'app-gl-changes',
    templateUrl: './gl-changes.component.html',
    styleUrls: ['./gl-changes.component.scss'],
    animations: [fuseAnimations],
})
export class GlChangesComponent implements OnInit {
    @ViewChild('showTypeInput') showTypeInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    showTypeCtl: FormControl = new FormControl();
    filteredShowTypes: Observable<Array<string>>;
    showTypes: Array<string> = ['کدهای با افزایش مبلغ', 'کدهای با کاهش مبلغ', 'کدهای حذف شده', 'کدهای اضافه شده'];
    allShowTypes: Array<string> = ['کدهای با افزایش مبلغ', 'کدهای با کاهش مبلغ', 'کدهای حذف شده', 'کدهای اضافه شده'];
    dataToShow = [];
    searchCollapse: boolean = false;
    glCategories: Array<GlCategoryModel>;
    glGroups: Array<GlGroupModel>;
    glGeneral: Array<GlGeneralModel>;
    form: FormGroup = this.fb.group({
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
    columns: Array<{ id: string; name: string; type: string }> = [
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

    constructor(private fb: FormBuilder, private glService: GlService) {
        this.filteredShowTypes = this.showTypeCtl.valueChanges.pipe(
            startWith(null),
            map((c: string | null) => (c ? this._filter(c) : this.allShowTypes.slice()))
        );
    }

    ngOnInit(): void {
        this.glService.getGLLevels(null, TreeOrderType.Category).subscribe((response: Array<GlCategoryModel>) => (this.glCategories = response));

        this.form.get('categoryCode').valueChanges.subscribe((response) => {
            this.glGroups = [];
            response.forEach((gr) => this.glService.getGLLevels(gr, TreeOrderType.Group).subscribe((x: Array<GlGroupModel>) => this.glGroups.push(...x)));
        });

        this.form.get('groupCode').valueChanges.subscribe((res) => {
            this.glGeneral = [];
            res.forEach((ge) => this.glService.getGLLevels(ge, TreeOrderType.General).subscribe((x: Array<GlGeneralModel>) => this.glGeneral.push(...x)));
        });
    }

    public submitForm(): void {
        const typeValues = [];
        this.showTypes.map((x) => {
            if (x === 'کدهای با افزایش مبلغ') typeValues.push('increase');
            else if (x === 'کدهای با کاهش مبلغ') typeValues.push('decrease');
            else if (x === 'کدهای حذف شده') typeValues.push('delete');
            else if (x === 'کدهای اضافه شده') typeValues.push('add');
        });

        this.form.get('type').setValue(typeValues);
        this.glService.getGLChangesHistory(this.form.value).subscribe((res: any) => {
            this.dataToShow = res;
            this.searchCollapse = false;
        });
    }

    public addItemFromAutoComplete(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        if ((value || '').trim()) {
            const index = this.allShowTypes.indexOf(value.trim());
            if (index > -1) this.showTypes.push(value.trim());
        }

        if (input) input.value = '';

        this.showTypeCtl.setValue(null);
    }

    public removeItemFromAutoComplete(fruit: string): void {
        const index = this.showTypes.indexOf(fruit);

        if (index >= 0) this.showTypes.splice(index, 1);
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        const index = this.showTypes.indexOf(event.option.viewValue);
        if (index === -1) this.showTypes.push(event.option.viewValue);
        this.showTypeInput.nativeElement.value = '';
        this.showTypeCtl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allShowTypes.filter((c) => c.toLowerCase().indexOf(filterValue) === 0);
    }
}
