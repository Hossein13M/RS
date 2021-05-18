import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { UpdateGuarantorsDto } from 'app/services/API/models';
import { GuarantorsService } from 'app/services/App/Guarantor/guarantor.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-guarantors',
    templateUrl: './guarantors.component.html',
    styleUrls: ['./guarantors.component.scss'],
    animations: fuseAnimations,
})
export class GuarantorsComponent implements OnInit {
    public guarantors = [];
    public searchkey: FormControl = new FormControl('');

    public ELEMENT_DATA: UpdateGuarantorsDto[] = [];
    public dataSource = new MatTableDataSource<UpdateGuarantorsDto>(this.ELEMENT_DATA);
    public displayedColumns = ['guarantorId', 'percent', 'edit'];

    public slectedGuarantorIndex: number;
    public guarantorForm: FormGroup;

    constructor(
        private guarantorServise: GuarantorsService,
        public matDialogRef: MatDialogRef<GuarantorsComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private fb: FormBuilder
    ) {
        this.ELEMENT_DATA = this._data.Guarantors;
        if (!this.ELEMENT_DATA) {
            this.ELEMENT_DATA = [];
        }
        this.dataSource = new MatTableDataSource<UpdateGuarantorsDto>(this.ELEMENT_DATA);

        this.guarantorServise.getGuarantors(this.searchkey.value).subscribe((res) => {
            this.guarantors = res;
        });

        this.guarantorForm = this.fb.group({
            guarantorId: ['', [Validators.required]],
            guarantorName: ['', []],
            percent: ['', [Validators.required, Validators.min(1)]],
        });
    }

    ngOnInit(): void {
        this.searchkey.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchText) => {
            this.guarantorServise.getGuarantors(this.searchkey.value).subscribe((res) => {
                this.guarantors = res;
            });
        });

        this.matDialogRef.beforeClosed().subscribe((r) => {
            this.matDialogRef.close(this.ELEMENT_DATA);
        });
    }

    editGuarantor(Guarantor, index): void {
        // this.guarantorForm.controls['guarantorName'].setValue(this.guarantorForm.controls['guarantorId'].value.guarantor, { emitEvent: false });
        // this.guarantorForm.controls['guarantorId'].setValue(this.guarantorForm.controls['guarantorId'].value.id);

        this.slectedGuarantorIndex = index;
        this.guarantorForm.controls['guarantorId'].setValue({
            guarantor: Guarantor.guarantorName,
            id: Guarantor.guarantorId,
        });
        this.guarantorForm.controls['percent'].setValue(Guarantor.percent);
    }

    clear(): void {
        this.slectedGuarantorIndex = null;
        this.guarantorForm.controls['guarantorId'].setValue(0);
        this.guarantorForm.controls['percent'].setValue(0);
    }

    edit(): void {
        const guarantors = this.ELEMENT_DATA;
        const findedGuarantor = guarantors[this.slectedGuarantorIndex];

        findedGuarantor.guarantorId = this.guarantorForm.controls['guarantorId'].value;
        findedGuarantor.percent = this.guarantorForm.controls['percent'].value;
        this.dataSource = new MatTableDataSource<UpdateGuarantorsDto>(this.ELEMENT_DATA);

        this.clear();
    }

    deleteCollat(index): void {
        const guarantors = this.ELEMENT_DATA;

        if (index > -1) {
            guarantors.splice(index, 1);
        }

        this.dataSource = new MatTableDataSource<UpdateGuarantorsDto>(this.ELEMENT_DATA);
    }

    addCollat(): void {
        this.guarantorForm.controls['guarantorName'].setValue(this.guarantorForm.controls['guarantorId'].value.guarantor, {
            emitEvent: false,
        });
        this.guarantorForm.controls['guarantorId'].setValue(this.guarantorForm.controls['guarantorId'].value.id);
        this.ELEMENT_DATA.push(this.guarantorForm.value);
        this.dataSource = new MatTableDataSource<UpdateGuarantorsDto>(this.ELEMENT_DATA);
        this.clear();
    }
}
